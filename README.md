# Breeze: A Declarative Infrastructure and Application Management Language 


The complexity of deploying, managing, and optimizing 
infrastructure and applications has spawned an entire collection
of industries and created a new subfield of software development.

Predictably, it has also motivated the creation of many products, services, and projects to
assist and automate the myriad tasks involved. Many or all of these products and services
require extensive expertise, which is frequently in high demand.  This proposes yet another.

## Why?

There are several broad themes within infrastructure and application management that must be 
addressed, frequently by one or more of the products detailed above:

1. Infrastructure
   1. Deployment Definition: Defining the infrastructure required
      1. Examples:  Visio/Draw.io/Pencil/etc.
   2. Deployment Execution: Actually deploying the infrastructure
      1. Examples: Chef/Puppet/Salt/CloudFormation/ResourceManager/Terraform/Sunshower.io
   3. Infrastructure Visualization: Visualizing what infrastructure exists
      1. Examples: Sunshower.io, Cloud Consoles
2. Infrastructure Management
   1. Monitoring: How is the infrastructure being used?  Are resources over/under committed?
      1. Examples: Datadog, CloudWatch, NewRelic, Broadcom UIM
   2. Cost optimization: Fit infrastructure spend to workloads
      1. Examples: Densify, Apptio, Onica, Sunshower.io
   3. Security Monitoring:  Determining whether infrastructure adheres to security policies
      1. Examples:  CheckPoint, Datadog, Fortinet, Lacework, Sophos
3. Application Management:
   1. Deployment: How do I deploy my application/services to the cloud?
      1. Examples: Kubernetes, CloudFormation, Sunshower.io, Pulumi, Chef, Puppet, Salt
TK: finish enumeration

The proliferation of products and services (usually consulting or paid SaaS) has resulted in deep
fragmentation.  We at Sunshower.io, having observed and managed thousands of infrastructure and 
application deployments believe we have the expertise to propose a new paradigm to address
the issues described above.

## Requirements
Among the myriad offerings partially described above, the most general and powerful offerings allow
users to define their rules, infrastructure, and applications as code.  Chef, Puppet, and Terraform
are good examples of what we will refer to as "Cloud as Code"--languages or domain-specific languages 
that encompass many or all of the aspects above.


We've used each of these tools for many years, and have deep respect for their capabilities. However,
each requires substantial expertise and time to acquire it. We propose a new paradigm to reduce expertise and
time requirements: Structured Cloud Management.


### Structure

What does "Structured" mean in this context?  Consider Structured Query Language (SQL), a language 
for storing and retrieving information.  As of 2022, SQL, a technology that is almost 50 years old, 
still dominates the [data management industry](https://db-engines.com/en/ranking_categories)

Part of this is certainly due to its combination of age and its improvements over preceding paradigms 
such as CODASYL, but the majority of it is due to its relative simplicity in conjunction with its
expressiveness.  In particular, the _structured_ component restricts the form of data insertion and
retrieval: modifications are always of a restricted form, e.g.:

```SQL
INSERT INTO "<TABLE>" VALUES (values)
```

```SQL
UPDATE "<TABLE>" SET {mutation clause} WHERE {restriction clause}
```

Contrast this with the approach taken by the Cloud-As-Code technologies where each of thousands or
tens-of-thousands of object-types usually has its own definition, one that often differs from provider to provider.
Indeed, when we at Sunshower.io set out to create our own general-purpose Cloud-As-Code language based on Lisp,
we failed to adequately unify concepts (and Lisp, while expressive and powerful, was too abstruse a choice for the task).

Moreover, the difficulty of extracting _cloud-semantic_ objects from a general-purpose language 
(i.e. "Virtual Machine Instance" vs. "For Loop" ) makes it difficult or impossible to represent cloud objects
in a more user-friendly format such as a diagram. This is doubtlessly the reason that CloudFormation,
for example, relies on declarative markup languages such as YAML and JSON. While allowing users to preview
and build their infrastructure in a nice visual format, the development experience is quite painful. 

### Constraint-Solving

Anyone who has defined any sort of Cloud-As-Code abstraction understands the agony of failed deployments.  
A typical deployment loop is one of writing a variation of the deployment, executing it, watching the
objects spin up in the cloud console, then failing after several minutes to hours, then repeating the cycle.

Reasons for these failures are difficult to enumerate, but they include the following classes:
1. Misconfigurations of object-definitions
2. Unsatisfied dependencies
3. Permissions errors
4. Misconfigurations of instance definitions (e.g. misconfigured UserData on VMs)

Existing technologies are generally unable to validate a given operation even if the information
is either semantically present in the operation's definition or inferable from its context. For instance,
Terraform will not detect the absence of a VPC specification for a Virtual Machine even though it is known
that one is required for placement. AWS must attempt and fail to place the VM before relaying the error
to the user.


### Templating

//tk


### Language Definition
The BNF grammar for Breeze is present in `lang/breeze-syntax/src/main/antlr/breeze.g4`

#### Object Definition

```sql

/**
  each module can be in its own file.  A file may declare/export multiple modules
 */
 
 /**
   configuration type template:
   everything is a heredoc that is templatizable
   can be placed anywhere on the operating system (OS-specific format)
   
   Contents can be files downloaded from protected or unprotected urls 
   
   Contents can be placed into various consumers that know how to handle them.
   
   Scripts are executed in an environment (typically Sunshower.io/Zephyr) and can reference
   values that are configured there.
  */
module configdata where
    export declare "userdata" of type template
        #/bin/bash
        
        sudo add-apt-repository {{repository default " http://repo.tld/ubuntu distro component"}}
        sudo apt-get update
    export declare binary of type url
       having required configuration
            username required from environment
                as "tenant.aws-bucket-username"
           password required from environment
                as "tenant.aws-bucket-username"
           target as "https://s3.aws.com/my/bucket/whatever" 
/**
  secrets are stored in the environment's secrets-manager, which is an implementation of 
  a Zephyr plugin extension point SecretManager 
 */
module secrets where
    export declare "test-virtual-machine-ssh-key"
        of type SSHPublicKey
        having required configuration
            material required from environment 
        as "tenant.test-virtual-machine-ssh-key"
       
/**
  Each object, such as "VirtualPrivateCloud" is an implementation of the cloud extension-point "VirtualPrivateCloud".
  This is resolved when the target is set on the deployment.  At that point, additional constraint-satisfication
  is demanded from the provider and will be reported to the user as an IDE error (or a Breeze language error such as)
  
  error:
    "my-test-vpc" targeting cloud provider "AWS"
    is missing property "tenancy" of type {string, reference}
    at module "virtual-private-clouds"
    in required configuration "tenancy"
 */
module virtual-private-clouds where 
    export declare "my-test-vpc" of type VirtualPrivateCloud
        having required configuration
            networking as
                port 8080 as ("ingress", "egress") allowing "TCP"
        

/**
  metrics are supplied by Zephyr plugins exporting the MetricProvider interface.  They can
  be provided authentication keys, etc. if required as part of the required configuration
 */
module metrics where
    export declare "cpuutil" of type Metric
        having required configuration
            provider as environment.metrics.provider.cpuutilization



/**
  define virtual machine
 */
module virtual-machines.instance-types where
   requires {"userdata"} from configdata
   requires {"cpuutil"}  from metrics
   requires {"my-test-vpc" as vpc} from virtual-private-clouds
   requires {"test-virtual-machine-ssh-key" as ssh-key} from secrets
   export declare "test-virtual-machine" of type VirtualMachineTemplate
      having required configuration
        cpu as 
            architecture "x86"
            count as range (12, 16) 
                optimizable as 
                    metric cpuutil
                    threshold as 
                        under anvil.lstm over "last 30 days"
                        over anvil.lstm immediate
        operating-system as
            name "debian"
            type "linux"
            version exact "11"
        userdata as 
           repository as "override repository" 
        networking as
            vpc references vpc
            bandwidth as min(25gbps)
        subnets as // reference subnets
      having optional configuration
        tags as
          environment as "test"

   export declare "test-vm-scale-group" as ScaleGroup
        having required configuration
            template references "test-virtual-machine"
            size as 
               minimum 1
               maximum 4
               


module test-scale-group where
   requires {"test-vm-scale-group" as test}
   export deployment "sample-vpc-with-scale-group" of type Deployment
        targeting environment.current-cloud as
            create infrastructure ScaleGroup as "my-test-environment" // actual name
                referencing ScaleGroup test
                having required configuration authentication as
                    credentials references environment.deployment-credentials
                        
```

This syntax is possibly best-compared with semi-equivalent Terraform.   This is the configuration
of just a Virtual Machine template taken from our local infrastructure definition at (https://github.com/sunshower-io/sunshower-devops/)


```terraform
terraform {
  required_providers {
    dns = {
      source = "hashicorp/dns"
    }
    proxmox = {
      source = "Telmate/proxmox"
    }
  }
}

locals {
  network = var.network_configuration
  node_cfg = var.virtual_machine_configuration
  nameservers = join(" ", var.network_configuration.nameservers)
}


/**
  create all virtual machines in the cluster
  subsequent modules will configure the virtual
  machines based on their roles
*/
resource "proxmox_vm_qemu" "virtual_machines" {
  for_each = {for vm in var.virtual_machines: "${vm.name}.${var.domain}" => vm}

  /**
    enable the QEMU agent on the virtual-machine
  */
  agent = each.value.enable_agent == true ? 1 : 0

  /**
    concatenation of <name> and <domain>
    e.g. etcd1.sunshower.io
  */
  name = each.key

  /**
    the resource pool to allocate the VM on
  */
  pool = each.value.pool

  /**
    the image to use
  */
  clone = each.value.clone

  /**
    the host to provision the machine on
    (e.g. "calypso" or "athena" or "demeter")
  */
  target_node = each.value.host

  os_type = each.value.os.type

  /**
    fully clone the base image or use a linked clone
  */
  full_clone = each.value.full_clone

  /**
    network configuration
  */
  searchdomain = var.domain

//  ipconfig0 = "ip=${each.value.ip}/24,gw=${local.network.gateway}"
  ipconfig0 = "ip=dhcp"

  network {
    model = "virtio"
    bridge = "vmbr0"
  }

  bootdisk = each.value.hardware_configuration.boot_disk

  /**
    hardware configurations
  */

  cores = each.value.hardware_configuration.cpu
  memory = each.value.hardware_configuration.memory
  sockets = each.value.hardware_configuration.sockets

  connection {
    type = "ssh"
    port = self.ssh_port
    host = self.ssh_host
    user = local.node_cfg.username
    password = local.node_cfg.password
  }

  provisioner "file" {
    source = "${path.module}/scripts/if-config.sh"
    destination = "/tmp/if-config.sh"
  }
  desc = each.value.ip


  provisioner "remote-exec" {
    inline = [
      "chmod +x /tmp/if-config.sh",
      "/tmp/if-config.sh ${each.value.ip} ${local.network.gateway} ${local.network.netmask} '${local.nameservers}'",
      "sudo -S -k hostnamectl set-hostname ${each.value.name}.${var.domain}",
      "nohup bash -c 'sleep 1; shutdown -r now > restart.log'&"
    ]
  }


  provisioner "local-exec" {
    command = "${path.module}/scripts/wait-port.sh ${each.value.name} ${var.domain} 22"
  }


}
```

### Semantics

Breeze object definitions described above could execute on any technology as they simply provide
explicit constraints and references to other objects.  As Breeze is statically typed, we can evaluate
both implicit and explicit constraints as type-judgments.  This is a fast process, and can be reported
to the user in real time.

Additionally, the structural aspect of Breeze allows the compiler to easily and accurately lay out the
planned infrastructure and deployments visually, or be generated by a visual modeler such as the Sunshower.io designer.



