// https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/pubsub_topic
resource "google_pubsub_topic" "global" {
  depends_on = [
    google_project.project,
  ]

  name = "global"

  message_retention_duration = "600s"
}
