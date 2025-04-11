package com.medinokapp

import android.content.Context
import android.content.Intent
import androidx.work.Worker
import androidx.work.WorkerParameters
import androidx.work.Data
import androidx.work.OneTimeWorkRequest
import androidx.work.WorkManager
import java.util.concurrent.TimeUnit // Add this import
import com.facebook.react.bridge.ReactApplicationContext

class AlarmWorker(appContext: Context, workerParams: WorkerParameters) : Worker(appContext, workerParams) {

    override fun doWork(): Result {
        val context = applicationContext
        val seconds = inputData.getInt("seconds", 0)

        // You can trigger the notification or action when the background task runs
        val intent = Intent(context, AlarmReceiver::class.java)

        // Trigger your background alarm or notification here
        // For example, sending a broadcast for AlarmReceiver to handle
        context.sendBroadcast(intent)

        // Log the background task
        println("Background task executed after $seconds seconds!")

        // Return success after completing the task
        return Result.success()
    }
}

// package com.medinokapp

// import android.app.NotificationChannel
// import android.app.NotificationManager
// import android.app.PendingIntent
// import android.content.Context
// import android.content.Intent
// import android.os.Build
// import androidx.core.app.NotificationCompat
// import androidx.work.Worker
// import androidx.work.WorkerParameters

// class AlarmWorker(appContext: Context, workerParams: WorkerParameters) : Worker(appContext, workerParams) {

//     override fun doWork(): Result {
//         val context = applicationContext
//         val seconds = inputData.getInt("seconds", 0)

//         // Intent to launch the MainActivity
//         val intent = Intent(context, MainActivity::class.java).apply {
//             flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK
//             putExtra("fromAlarm", true)
//         }

//         val pendingIntent = PendingIntent.getActivity(
//             context,
//             0,
//             intent,
//             PendingIntent.FLAG_IMMUTABLE or PendingIntent.FLAG_UPDATE_CURRENT
//         )

//         val channelId = "alarm_channel"
//         val notificationManager =
//             context.getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager

//         // Create notification channel if Android version >= O
//         if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
//             val channel = NotificationChannel(
//                 channelId,
//                 "Alarm Notifications",
//                 NotificationManager.IMPORTANCE_HIGH
//             )
//             notificationManager.createNotificationChannel(channel)
//         }

//         // Build the notification
//         val notification = NotificationCompat.Builder(context, channelId)
//             .setSmallIcon(android.R.drawable.ic_dialog_info)
//             .setContentTitle("Alarm Triggered!")
//             .setContentText("Tap to open the app.")
//             .setContentIntent(pendingIntent)
//             .setAutoCancel(true)
//             .build()

//         // Show notification
//         notificationManager.notify(1, notification)

//         return Result.success()
//     }
// }

// package com.medinokapp

// import android.app.PendingIntent
// import android.content.Context
// import android.content.Intent
// import androidx.work.Worker
// import androidx.work.WorkerParameters

// class AlarmWorker(appContext: Context, workerParams: WorkerParameters) : Worker(appContext, workerParams) {

//     override fun doWork(): Result {
//         val context = applicationContext

//         // Create the intent to open AlarmFullscreenActivity
//         val activityIntent = Intent(context, AlarmReceiver::class.java).apply {
//             addFlags(Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TOP)
//         }

//         // Optional: use PendingIntent for launching activity (even though not strictly needed here)
//         val pendingIntent = PendingIntent.getActivity(
//             context,
//             0,
//             activityIntent,
//             PendingIntent.FLAG_IMMUTABLE or PendingIntent.FLAG_UPDATE_CURRENT
//         )

//         // Launch fullscreen alarm screen
//         pendingIntent.send() // This launches the activity

//         println("AlarmWorker triggered and full screen activity launched!")

//         return Result.success()
//     }
// }

