//package com.alarm;
//
//import android.content.Context;
//import android.content.SharedPreferences;
//import android.util.Log;
//
//import com.medinokapp.R;
//import com.google.gson.Gson;
//
//import java.util.ArrayList;
//import java.util.Date;
//import java.util.Map;
//
//class Storage {
//
//    static void saveAlarm(Context context, Alarm alarm) {
//        Log.d("TAG", "onBind called");
//        SharedPreferences.Editor editor = getEditor(context);
//        editor.putString(alarm.uid, Alarm.toJson(alarm));
//        editor.apply();
//    }
//
//    static void saveDates(Context context, AlarmDates dates) {
//        SharedPreferences.Editor editor = getEditor(context);
//        editor.putString(dates.uid, AlarmDates.toJson(dates));
//        editor.apply();
//    }
//
//    static Alarm[] getAllAlarms(Context context) {
//        ArrayList<Alarm> alarms = new ArrayList<>();
//        SharedPreferences preferences = getSharedPreferences(context);
//        Map<String, ?> keyMap = preferences.getAll();
//        for (Map.Entry<String, ?> entry : keyMap.entrySet()) {
//            if (AlarmDates.isDatesId(entry.getKey())) continue;
//            alarms.add(Alarm.fromJson((String)entry.getValue()));
//        }
//        return alarms.toArray(new Alarm[0]);
//    }
//
//    static Alarm getAlarm(Context context, String alarmUid) {
//        SharedPreferences preferences = getSharedPreferences(context);
//        return Alarm.fromJson(preferences.getString(alarmUid, null));
//    }
//
//    static AlarmDates getDates(Context context, String alarmUid) {
//        SharedPreferences preferences = getSharedPreferences(context);
//        String json = preferences.getString(AlarmDates.getDatesId(alarmUid), null);
//        return AlarmDates.fromJson(json);
//    }
//
//    static void removeAlarm(Context context, String alarmUid) {
//        remove(context, alarmUid);
//    }
//
//    static void removeDates(Context context, String alarmUid) {
//        remove(context, AlarmDates.getDatesId(alarmUid));
//    }
//
//    private static void remove(Context context, String id) {
//        SharedPreferences preferences = getSharedPreferences(context);
//        SharedPreferences.Editor editor = preferences.edit();
//        editor.remove(id);
//        editor.apply();
//    }
//
//    private static SharedPreferences.Editor getEditor (Context context) {
//        SharedPreferences sharedPreferences = getSharedPreferences(context);
//        return sharedPreferences.edit();
//    }
//
//    private static SharedPreferences getSharedPreferences(Context context) {
//        String fileKey = context.getResources().getString(R.string.notification_channel_id);
//        return context.getSharedPreferences(fileKey, Context.MODE_PRIVATE);
//    }
//
//}
package com.alarm;

import android.content.Context;
import android.content.SharedPreferences;
import android.util.Log;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;

class Storage {

    private static final String ALARMS_KEY = "alarms_list"; // Key for storing all alarms

    // Save all alarms
    static void saveAlarm(Context context, Alarm alarm) {
        List<Alarm> alarms = getAllAlarms(context);
        alarms.add(alarm); // Add the new alarm to the list
        saveAlarmsList(context, alarms); // Save the updated list
    }

    // Get all alarms
    static List<Alarm> getAllAlarms(Context context) {
        SharedPreferences preferences = getSharedPreferences(context);
        String json = preferences.getString(ALARMS_KEY, null);
        if (json == null) {
            return new ArrayList<>(); // Return an empty list if no alarms are saved
        }
        Type type = new TypeToken<List<Alarm>>() {}.getType();
        return new Gson().fromJson(json, type);
    }

    // Save the list of alarms
    private static void saveAlarmsList(Context context, List<Alarm> alarms) {
        SharedPreferences.Editor editor = getEditor(context);
        String json = new Gson().toJson(alarms);
        editor.putString(ALARMS_KEY, json);
        editor.apply();
    }

    // Remove an alarm by UID
    static void removeAlarm(Context context, String alarmUid) {
        List<Alarm> alarms = getAllAlarms(context);
        alarms.removeIf(alarm -> alarm.uid.equals(alarmUid)); // Remove the alarm with the given UID
        saveAlarmsList(context, alarms); // Save the updated list
    }

    // Get a specific alarm by UID
    static Alarm getAlarm(Context context, String alarmUid) {
        List<Alarm> alarms = getAllAlarms(context);
        for (Alarm alarm : alarms) {
            if (alarm.uid.equals(alarmUid)) {
                return alarm;
            }
        }
        return null; // Return null if the alarm is not found
    }

    // Helper methods
    private static SharedPreferences.Editor getEditor(Context context) {
        return getSharedPreferences(context).edit();
    }

    private static SharedPreferences getSharedPreferences(Context context) {
        return context.getSharedPreferences("alarms_prefs", Context.MODE_PRIVATE);
    }
}