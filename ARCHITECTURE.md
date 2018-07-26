### Overview
The current implementation is simplistic, using express middleware routing to fallback to a secondary email provider.  

### Limitations of this solution:
- requests are not evenly distributed between the two providers
- a provider is still called even if previous recent attempts have failed 
- the calls to the external provider apis run on the web process resulting in slow responses
- potential high traffic scalability issues

### Suggested architectural improvements:
![archtecture](/architecture.jpg?raw=true "Proposed Changes")
- implement a "round-robin" system to more evenly distribute the traffic between providers
- allow a provider, whether it be by configuration or monitoring, to be excluded from a list of available providers
- offload the external api calls to a worker app
- return http `202` when request accepted for processing
- keep track of email statuses via a datastore
- allow the api to query the status of an email eg `/email:id`

