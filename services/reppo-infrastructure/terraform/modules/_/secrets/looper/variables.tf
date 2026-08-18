variable "secrets" {
  description = "List of secret names to create."
  type        = list(string)
}

variable "service" {
  description = "Name of service to use as label."
  type        = string
}
