package com.medinokapp

import android.content.Context
import androidx.work.Worker
import androidx.work.WorkerParameters
import android.app.Notification
import android.app.NotificationChannel
import android.app.NotificationManager
import android.os.Build

class NotificationWorker(context: Context, workerParams: WorkerParameters) : Worker(context, workerParams) {

    override fun doWork(): Result {
        val medicineName = inputData.getString("medicineName")
        val medicineLocalId = inputData.getString("medicineLocalId")
        val day = inputData.getString("day")

        if (medicineName != null && medicineLocalId != null && day != null) {
            showNotification(applicationContext, medicineName, medicineLocalId, day)
            return Result.success()
        } else {
            return Result.failure()
        }
    }

    private fun showNotification(context: Context, medicineName: String, medicineLocalId: String, day: String) {
        val channelId = "medication_reminder_channel"
        val notificationManager = context.getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
        
        // For devices running on API 26 (Android 8) and above, you need to create a Notification Channel
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val channel = NotificationChannel(
                channelId,
                "Medication Reminder Notifications",
                NotificationManager.IMPORTANCE_DEFAULT
            )
            notificationManager.createNotificationChannel(channel)
        }

        // Create a Notification
        val notificationBuilder = Notification.Builder(context, channelId)
            .setContentTitle("Time for your medicine!")
            .setContentText("Take your $medicineName for $medicineLocalId today: $day.")
            .setSmallIcon(android.R.drawable.ic_dialog_info)
            .setAutoCancel(true)

        // Show the notification
        notificationManager.notify(0, notificationBuilder.build())
    }
}
