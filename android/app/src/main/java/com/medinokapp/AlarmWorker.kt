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
