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

Part of this is certainly due to its combination of age and its improvements over preceding modules 
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
  define virtual machine
 */
 
module secrets where
    declare "test-virtual-machine-ssh-key"
        of type SSHPublicKey
        having required configuration
            material required from environment 
        as "tenant.test-virtual-machine-ssh-key"
        
module virtual-private-clouds where 
    declare "my-test-vpc" of type VirtualPrivateCloud
        having required configuration
            networking as
                port 8080 as ("ingress", "egress") allowing "TCP"

module virtual-machines.instance-types where
   requires {"my-test-vpc" as vpc} from virtual-private-clouds
   requires {"test-virtual-machine-ssh-key" as ssh-key} from secrets
   declare "test-virtual-machine" of type VirtualMachine
      having required configuration
        cpu as 
            architecture "x86"
            count as range (12, 16)
        operating-system as "windows"
        networking as
            vpc references vpc
            bandwidth as min(25gbps)
        subnets as // reference subnets
            
            


```



 





















