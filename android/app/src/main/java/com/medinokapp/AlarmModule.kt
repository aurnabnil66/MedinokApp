package com.medinokapp

import android.app.AlarmManager
import android.app.PendingIntent
import android.content.Context
import android.content.Intent
import android.os.Build
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
class AlarmModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    override fun getName() = "AlarmModule"
    @ReactMethod
    fun setAlarmInSeconds(seconds: Int) {
        val context = reactApplicationContext
        val alarmManager = context.getSystemService(Context.ALARM_SERVICE) as AlarmManager
        val intent = Intent(context, AlarmReceiver::class.java)
        val pendingIntent = PendingIntent.getBroadcast(
            context, 0, intent,
            PendingIntent.FLAG_UPDATE_CURRENT or
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M)
                PendingIntent.FLAG_IMMUTABLE else 0
        )
        val triggerAt = System.currentTimeMillis() + seconds * 1000
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            alarmManager.setExactAndAllowWhileIdle(AlarmManager.RTC_WAKEUP, triggerAt, pendingIntent)
        } else {
            alarmManager.setExact(AlarmManager.RTC_WAKEUP, triggerAt, pendingIntent)
        }
    }
}

// package com.medinokapp

// import android.content.Context
// import android.content.Intent
// import androidx.work.OneTimeWorkRequest
// import androidx.work.WorkManager
// import androidx.work.WorkRequest
// import androidx.work.Data
// import com.facebook.react.bridge.ReactApplicationContext
// import com.facebook.react.bridge.ReactContextBaseJavaModule
// import com.facebook.react.bridge.ReactMethod
// import java.util.concurrent.TimeUnit

// class AlarmModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

//     override fun getName() = "AlarmModule"

//     @ReactMethod
//     fun setAlarmInSeconds(seconds: Int) {
//         // Create input data for the WorkManager task
//         val inputData = Data.Builder()
//             .putInt("seconds", seconds)
//             .build()

//         // Create a OneTimeWorkRequest with the specified delay
//         val workRequest: WorkRequest = OneTimeWorkRequest.Builder(AlarmWorker::class.java)
//             .setInitialDelay(seconds.toLong(), TimeUnit.SECONDS)
//             .setInputData(inputData)
//             .build()

//         // Enqueue the work request
//         val workManager = WorkManager.getInstance(reactApplicationContext)
//         workManager.enqueue(workRequest)
//     }
// }

// package com.medinokapp

// import androidx.work.*
// import com.facebook.react.bridge.ReactApplicationContext
// import com.facebook.react.bridge.ReactContextBaseJavaModule
// import com.facebook.react.bridge.ReactMethod
// import java.util.concurrent.TimeUnit
// import androidx.work.workDataOf

// class AlarmModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

//     override fun getName() = "AlarmModule"

//     @ReactMethod
//     fun setAlarmInSeconds(seconds: Int) {
//         val inputData = workDataOf("seconds" to seconds)

//         val workRequest = OneTimeWorkRequestBuilder<AlarmWorker>()
//             .setInitialDelay(seconds.toLong(), TimeUnit.SECONDS)
//             .setInputData(inputData)
//             .addTag("medinok_alarm_task") // Optional tag for easier tracking
//             .build()

//         WorkManager.getInstance(reactApplicationContext).enqueue(workRequest)
//     }
// }

// package com.medinokapp

// import android.app.AlarmManager
// import android.app.PendingIntent
// import android.content.Context
// import android.content.Intent
// import com.facebook.react.bridge.ReactApplicationContext
// import com.facebook.react.bridge.ReactContextBaseJavaModule
// import com.facebook.react.bridge.ReactMethod

// class AlarmModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
//     private val context: Context = reactContext

//     override fun getName() = "AlarmModule"

//     @ReactMethod
//     fun setAlarmInSeconds(seconds: Int) {
//         val alarmTime = System.currentTimeMillis() + seconds * 1000

//         val intent = Intent(context, AlarmReceiver::class.java)
//         val pendingIntent = PendingIntent.getBroadcast(
//             context,
//             0,
//             intent,
//             PendingIntent.FLAG_IMMUTABLE or PendingIntent.FLAG_UPDATE_CURRENT
//         )

//         val alarmManager = context.getSystemService(Context.ALARM_SERVICE) as AlarmManager
//         alarmManager.setExactAndAllowWhileIdle(
//             AlarmManager.RTC_WAKEUP,
//             alarmTime,
//             pendingIntent
//         )
//     }
// }







