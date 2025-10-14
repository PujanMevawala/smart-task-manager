Terraform infra helper for local development

Usage (local):

- Install Terraform and ensure you have a working kubeconfig (e.g. from `kind` or `minikube`).
- From this folder run:

  terraform init
  terraform apply

This will create a namespace and simple Deployments/Services that reference local images (use `docker build` to create images first).

Note: This setup is intentionally minimal and designed for local use with kind/minikube. It does not provision cloud resources.
