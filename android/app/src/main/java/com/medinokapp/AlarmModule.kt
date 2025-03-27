package com.medinokapp

import android.app.AlarmManager
import android.app.PendingIntent
import android.content.Context
import android.content.Intent
import android.os.SystemClock
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
class AlarmModule(private val reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    override fun getName(): String {
        return "AlarmModule"
    }
    @ReactMethod
    fun setAlarm(message: String, delayInSeconds: Int) {
        val context = reactContext
        val intent = Intent(context, AlarmReceiver::class.java).apply {
            putExtra("message", message)
        }
        val pendingIntent = PendingIntent.getBroadcast(
            context,
            0,
            intent,
            PendingIntent.FLAG_IMMUTABLE or PendingIntent.FLAG_UPDATE_CURRENT
        )
        val alarmManager = context.getSystemService(Context.ALARM_SERVICE) as? AlarmManager
        val triggerAtMillis = SystemClock.elapsedRealtime() + delayInSeconds * 1000
        alarmManager?.setExact(
            AlarmManager.ELAPSED_REALTIME_WAKEUP,
            triggerAtMillis,
            pendingIntent
        )
    }
}