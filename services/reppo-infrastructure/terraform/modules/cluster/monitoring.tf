# https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/monitoring_alert_policy
resource "google_monitoring_alert_policy" "container_logs" {
  alert_strategy {
    # TODO: reidenzon - Enable when the disable close notification flag is available... otherwise too verbose during apply.
    #auto_close = null
    notification_rate_limit {
      period = "300s"
    }
  }
  depends_on = [
    google_container_cluster.cluster,
  ]
  display_name          = "Kubernetes Container - Logs"
  enabled               = true
  notification_channels = var.notification_channels
  combiner              = "OR"
  conditions {
    display_name = "Condition: Error, Critical, Alert, Emergency"
    condition_matched_log {
      # TODO: reidenzon - Confirm labels!
      filter = "resource.type=k8s_container AND resource.labels.container_name:reppo-api AND severity>=ERROR"
    }
  }
}

# https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/monitoring_alert_policy
resource "google_monitoring_alert_policy" "container_cpu" {
  # TODO: reidenzon - Enable when the disable close notification flag is available... otherwise too verbose during apply.
  # alert_strategy {
  #   auto_close = null
  # }
  depends_on = [
    google_container_cluster.cluster,
  ]
  display_name          = "Kubernetes Container - CPU"
  enabled               = true
  notification_channels = var.notification_channels
  combiner              = "OR"
  conditions {
    display_name = "Condition: 50%"
    condition_threshold {
      aggregations {
        alignment_period   = "120s"
        per_series_aligner = "ALIGN_MEAN"
      }
      comparison      = "COMPARISON_GT"
      duration        = "0s"
      filter          = "resource.type=k8s_container AND resource.labels.container_name=starts_with(\"reppo\") AND metric.type=\"kubernetes.io/container/cpu/limit_utilization\""
      threshold_value = 0.5
      trigger {
        count = 1
      }
    }
  }
}

# https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/monitoring_alert_policy
resource "google_monitoring_alert_policy" "container_memory" {
  # TODO: reidenzon - Enable when the disable close notification flag is available... otherwise too verbose during apply.
  # alert_strategy {
  #   auto_close = null
  # }
  depends_on = [
    google_container_cluster.cluster,
  ]
  display_name          = "Kubernetes Container - Memory"
  enabled               = true
  notification_channels = var.notification_channels
  combiner              = "OR"
  conditions {
    display_name = "Condition: 50%"
    condition_threshold {
      aggregations {
        alignment_period   = "120s"
        per_series_aligner = "ALIGN_MEAN"
      }
      comparison      = "COMPARISON_GT"
      duration        = "0s"
      filter          = "resource.type=k8s_container AND resource.labels.container_name = starts_with(\"stack\") AND metric.type = \"kubernetes.io/container/memory/limit_utilization\""
      threshold_value = 0.5
      trigger {
        count = 1
      }
    }
  }
}

# https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/monitoring_alert_policy
resource "google_monitoring_alert_policy" "database_connections" {
  # TODO: reidenzon - Enable when the disable close notification flag is available... otherwise too verbose during apply.
  # alert_strategy {
  #   auto_close = null
  # }
  depends_on = [
    google_sql_database_instance.database,
  ]
  display_name          = "Database Instance - Connections"
  enabled               = true
  notification_channels = var.notification_channels
  combiner              = "OR"
  conditions {
    display_name = "Condition: 50"
    condition_threshold {
      aggregations {
        alignment_period   = "120s"
        per_series_aligner = "ALIGN_MEAN"
      }
      comparison      = "COMPARISON_GT"
      duration        = "0s"
      filter          = "resource.type=cloudsql_database AND metric.type=\"cloudsql.googleapis.com/database/postgresql/num_backends_by_state\" AND metric.labels.database=postgres"
      threshold_value = 50
      trigger {
        count = 1
      }
    }
  }
}

# https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/monitoring_alert_policy
resource "google_monitoring_alert_policy" "database_execution" {
  # TODO: reidenzon - Enable when the disable close notification flag is available... otherwise too verbose during apply.
  # alert_strategy {
  #   auto_close = null
  # }
  depends_on = [
    google_sql_database_instance.database,
  ]
  display_name          = "Database Instance - Execution"
  enabled               = true
  notification_channels = var.notification_channels
  combiner              = "OR"
  conditions {
    display_name = "Condition: 100ms"
    condition_threshold {
      aggregations {
        alignment_period     = "60s"
        cross_series_reducer = "REDUCE_MAX"
        group_by_fields      = ["metric.label.querystring"]
        per_series_aligner   = "ALIGN_DELTA"
      }
      comparison      = "COMPARISON_GT"
      duration        = "120s"
      filter          = "resource.type=cloudsql_instance_database AND resource.labels.database=postgres AND metric.type=\"cloudsql.googleapis.com/database/postgresql/insights/perquery/execution_time\" AND metric.labels.querystring!=\"UTILITY COMMAND\""
      threshold_value = 100000 // microseconds
      trigger {
        count = 5
      }
    }
  }
}
