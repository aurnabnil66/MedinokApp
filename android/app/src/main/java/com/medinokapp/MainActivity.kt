package com.medinokapp

import android.os.Bundle
import android.app.AlarmManager
import android.app.NotificationChannel
import android.app.NotificationManager
import android.content.Context
import android.content.Intent
import android.net.Uri
import android.os.Build
import android.provider.Settings
import android.media.AudioAttributes
import android.content.ContentResolver
import androidx.core.app.NotificationCompat
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate

import com.codegulp.invokeapp.RNInvokeApp;

class MainActivity : ReactActivity() {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  override fun getMainComponentName(): String = "MedinokApp"

  /**
   * Returns the instance of the [ReactActivityDelegate]. We use [DefaultReactActivityDelegate]
   * which allows you to enable New Architecture with a single boolean flags [fabricEnabled]
   */

   override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        RNInvokeApp.sendEvent()
    }

  override fun createReactActivityDelegate(): ReactActivityDelegate =
      DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)

  override fun onResume() {
        super.onResume()
        
        // Check if the app can schedule exact alarms
        val alarmManager = getSystemService(Context.ALARM_SERVICE) as AlarmManager
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S && !alarmManager.canScheduleExactAlarms()) {
            // If not, request the SCHEDULE_EXACT_ALARM permission
            val intent = Intent(Settings.ACTION_REQUEST_SCHEDULE_EXACT_ALARM).apply {
                data = Uri.fromParts("package", packageName, null)
            }
            startActivity(intent)
        }

        // Create Notification Channel for Custom Sound
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val channelId = "team-pharmaceuticals" // Channel ID
            val channelName = "Team Pharmaceuticals Notifications" // Channel Name
            val soundFileName = "ringtone" // Sound file name without extension

            // Create a NotificationChannel
            val notificationChannel = NotificationChannel(
                channelId,
                channelName,
                NotificationManager.IMPORTANCE_HIGH
            )

            // Construct the URI for the sound
          val soundUri = Uri.parse(ContentResolver.SCHEME_ANDROID_RESOURCE + "://" + packageName + "/raw/ringtone")

            // Set custom sound and audio attributes
            val audioAttributes = AudioAttributes.Builder()
                .setUsage(AudioAttributes.USAGE_NOTIFICATION)
                .setContentType(AudioAttributes.CONTENT_TYPE_SONIFICATION)
                .build()

            notificationChannel.setSound(soundUri, audioAttributes)
            notificationChannel.enableVibration(true)
            notificationChannel.vibrationPattern = longArrayOf(400, 400)
            notificationChannel.lockscreenVisibility = NotificationCompat.VISIBILITY_PUBLIC

            // Get the NotificationManager system service
            val notificationManager = getSystemService(NotificationManager::class.java)
            notificationManager.createNotificationChannel(notificationChannel)
        }
    }
}
