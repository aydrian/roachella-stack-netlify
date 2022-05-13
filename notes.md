SQL USER -> domitrius
SQL USER PASS -> lmgEsMQjMUcZ0burVFmqyQ

Run the following command to download the CA cert for server certificate verification:
```
curl --create-dirs -o $HOME/.postgresql/root.crt -O https://cockroachlabs.cloud/clusters/6be21d42-1145-48f7-a7cb-6a8d7d3c1bb5/cert
```

Use the following connection string to connect to your cluster
```
postgresql://domitrius:lmgEsMQjMUcZ0burVFmqyQ@free-tier14.aws-us-east-1.cockroachlabs.cloud:26257/defaultdb?sslmode=verify-full&options=--cluster=spiffy-being-1875
```

Take that url and connect it to your cockroach db through the CLI 
```
brew install cockroach
```
.. to install the CLI if you don't have it

Once it is:
```
cockroach sql --url "postgresql://domitrius:lmgEsMQjMUcZ0burVFmqyQ@free-tier14.aws-us-east-1.cockroachlabs.cloud:26257/defaultdb?sslmode=verify-full&options=--cluster=spiffy-being-1875&sslrootcert=$HOME/.postgresql/root.crt"
```
where `&sslrootcert=$HOME/.postgresql/root.crt` is the root of your sert you set earlier through earlier the curl command.