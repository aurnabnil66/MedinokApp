package com.medinokapp

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.widget.Toast
class AlarmReceiver : BroadcastReceiver() {
    override fun onReceive(context: Context?, intent: Intent?) {
        val message = intent?.getStringExtra("message") ?: "Alarm!"
        Toast.makeText(context, message, Toast.LENGTH_LONG).show()
        // You could show a notification instead of Toast here
    }
}