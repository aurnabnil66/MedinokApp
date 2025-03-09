import { IMedicine } from '@/store/slices/features/medicineDetails/types';
import moment from 'moment';

const multiScheduleMaker = (
  data: IMedicine[],
  startDate: string,
  endDate: string,
  interval?: number,
  recurrence?: 'weekly' | 'monthly'
): IMedicine[] => {
  const inputFormat = 'D MMMM, YYYY';
  const start = moment(startDate, inputFormat, true);
  const end = moment(endDate, inputFormat, true);

  if (!startDate && !endDate) {
    return data;
  }

  if (!start.isValid() || !end.isValid()) {
    throw new Error(`Invalid start or end date. Ensure dates match format: ${inputFormat}`);
  }

  const allSchedules: IMedicine[] = [];
  let currentDate = start.clone();

  if (!recurrence) {
    // Original interval logic (unchanged)
    if (interval === 0 || interval === undefined) {
      while (currentDate.isSameOrBefore(end, 'day')) {
        data.forEach(schedule => {
          const doseTime = moment(schedule.doseTime.trim(), 'hh:mm A');
          if (!doseTime.isValid()) {
            throw new Error(`Invalid doseTime format: ${schedule.doseTime}`);
          }

          const selectedDateTime = currentDate.clone().set({
            hour: doseTime.hour(),
            minute: doseTime.minute(),
            second: 0,
            millisecond: 0
          });

          const isDuplicate = allSchedules.some(
            existingSchedule =>
              existingSchedule.medicineLocalId === schedule.medicineLocalId &&
              moment(existingSchedule.selectedDateTime).isSame(selectedDateTime, 'minute')
          );

          if (!isDuplicate) {
            const newSchedule: IMedicine = {
              ...schedule,
              selectedDateTime: selectedDateTime.toDate()
            };

            allSchedules.push(newSchedule);
          }
        });
        currentDate.add(1, 'days');
      }
    } else {
      while (currentDate.isSameOrBefore(end, 'day')) {
        data.forEach(schedule => {
          const doseTime = moment(schedule.doseTime.trim(), 'hh:mm A');
          if (!doseTime.isValid()) {
            throw new Error(`Invalid doseTime format: ${schedule.doseTime}`);
          }

          const selectedDateTime = currentDate.clone().set({
            hour: doseTime.hour(),
            minute: doseTime.minute(),
            second: 0,
            millisecond: 0
          });

          const isDuplicate = allSchedules.some(
            existingSchedule =>
              existingSchedule.medicineLocalId === schedule.medicineLocalId &&
              moment(existingSchedule.selectedDateTime).isSame(selectedDateTime, 'minute')
          );

          if (!isDuplicate) {
            const newSchedule: IMedicine = {
              ...schedule,
              selectedDateTime: selectedDateTime.toDate()
            };

            allSchedules.push(newSchedule);
          }
        });
        currentDate.add(interval, 'days');
      }
    }
  } else if (recurrence === 'weekly') {
    // Fixed Weekly Recurrence Logic
    while (currentDate.isSameOrBefore(end, 'day')) {
      data.forEach(schedule => {
        const doseTime = moment(schedule.doseTime.trim(), 'hh:mm A');
        if (!doseTime.isValid()) {
          throw new Error(`Invalid doseTime format: ${schedule.doseTime}`);
        }

        // Set the selectedDateTime based on the original schedule's day of the week
        const originalDayOfWeek = moment(schedule.selectedDateTime).day(); // Day of the week for this dose
        const targetDate = currentDate.clone().day(originalDayOfWeek);

        // Ensure the targetDate is within the range
        if (targetDate.isSameOrAfter(start, 'day') && targetDate.isSameOrBefore(end, 'day')) {
          const selectedDateTime = targetDate.clone().set({
            hour: doseTime.hour(),
            minute: doseTime.minute(),
            second: 0,
            millisecond: 0
          });

          const isDuplicate = allSchedules.some(
            existingSchedule =>
              existingSchedule.medicineLocalId === schedule.medicineLocalId &&
              moment(existingSchedule.selectedDateTime).isSame(selectedDateTime, 'minute')
          );

          if (!isDuplicate) {
            const newSchedule: IMedicine = {
              ...schedule,
              selectedDateTime: selectedDateTime.toDate()
            };

            allSchedules.push(newSchedule);
          }
        }
      });
      currentDate.add(1, 'week'); // Increment by 1 week
    }
  } else if (recurrence === 'monthly') {
    while (currentDate.isSameOrBefore(end, 'day')) {
      data.forEach(schedule => {
        const doseTime = moment(schedule.doseTime.trim(), 'hh:mm A');
        if (!doseTime.isValid()) {
          throw new Error(`Invalid doseTime format: ${schedule.doseTime}`);
        }

        // Set selectedDateTime with month adjusted
        const selectedDateTime = currentDate.clone().set({
          hour: doseTime.hour(),
          minute: doseTime.minute(),
          second: 0,
          millisecond: 0,
          date: moment(schedule.selectedDateTime).date() // Use the original day of the month
        });

        // Ensure selectedDateTime is within the date range
        if (
          selectedDateTime.isSameOrAfter(start, 'day') &&
          selectedDateTime.isSameOrBefore(end, 'day')
        ) {
          const isDuplicate = allSchedules.some(
            existingSchedule =>
              existingSchedule.medicineLocalId === schedule.medicineLocalId &&
              moment(existingSchedule.selectedDateTime).isSame(selectedDateTime, 'minute')
          );

          if (!isDuplicate) {
            const newSchedule: IMedicine = {
              ...schedule,
              selectedDateTime: selectedDateTime.toDate()
            };
            allSchedules.push(newSchedule);
          }
        }
      });
      currentDate.add(1, 'month');
    }
  }

  return allSchedules;
};

// const multiScheduleMaker = (data: IMedicine[], startDate: string, endDate: string, interval?: number): IMedicine[] => {
//     const inputFormat = 'D MMMM, YYYY';
//     const start = moment(startDate, inputFormat, true);
//     const end = moment(endDate, inputFormat, true);

//     console.log("start", start, startDate);
//     console.log("end", end, endDate);
//     console.log("interval", interval);

//     console.log("data", data);
//     if (!startDate && !endDate) {
//        return data;
//     }

//     if (!start.isValid() || !end.isValid()) {
//       throw new Error(`Invalid start or end date. Ensure dates match format: ${inputFormat}`);
//     }

//     const allSchedules: IMedicine[] = [];
//     console.log("start clone", start.clone());

//     let currentDate = start.clone();
//     console.log("is same", currentDate.isSameOrBefore(end, 'day'));

//     // If interval is undefined or 0, process day by day
//     if (interval === 0 || interval === undefined) {
//       // Loop day by day from start date to end date
//       while (currentDate.isSameOrBefore(end, 'day')) {
//         console.log("currentDate", currentDate.isSameOrBefore(end, 'day'), currentDate);

//         data.forEach((schedule) => {
//           console.log(`Parsing doseTime: ${schedule.doseTime}`);
//           const doseTime = moment(schedule.doseTime.trim(), 'hh:mm A'); // Remove strict parsing for leniency

//           if (!doseTime.isValid()) {
//             console.error(`Invalid doseTime format: ${schedule.doseTime}`);
//             throw new Error(`Invalid doseTime format: ${schedule.doseTime}`);
//           }

//           const selectedDateTime = currentDate.clone().set({
//             hour: doseTime.hour(),
//             minute: doseTime.minute(),
//             second: 0,
//             millisecond: 0,
//           });

//           const isDuplicate = allSchedules.some(
//             (existingSchedule) =>
//               existingSchedule.medicineLocalId === schedule.medicineLocalId &&
//               moment(existingSchedule.selectedDateTime).isSame(selectedDateTime, 'minute')
//           );

//           if (!isDuplicate) {
//             const newSchedule: IMedicine = {
//               ...schedule,
//               selectedDateTime: selectedDateTime.toDate(),
//             };

//             allSchedules.push(newSchedule);
//           }
//         });

//         // Add 1 day if interval is 0, or use the specified interval
//         currentDate.add(1, 'days'); // Add 1 day for interval = 0 or undefined
//       }
//     } else {
//       // If interval is greater than 0, loop with the specified gap between dates
//       while (currentDate.isSameOrBefore(end, 'day')) {
//         console.log("currentDate", currentDate.isSameOrBefore(end, 'day'), currentDate);

//         data.forEach((schedule) => {
//           console.log(`Parsing doseTime: ${schedule.doseTime}`);
//           const doseTime = moment(schedule.doseTime.trim(), 'hh:mm A'); // Remove strict parsing for leniency

//           if (!doseTime.isValid()) {
//             console.error(`Invalid doseTime format: ${schedule.doseTime}`);
//             throw new Error(`Invalid doseTime format: ${schedule.doseTime}`);
//           }

//           const selectedDateTime = currentDate.clone().set({
//             hour: doseTime.hour(),
//             minute: doseTime.minute(),
//             second: 0,
//             millisecond: 0,
//           });

//           const isDuplicate = allSchedules.some(
//             (existingSchedule) =>
//               existingSchedule.medicineLocalId === schedule.medicineLocalId &&
//               moment(existingSchedule.selectedDateTime).isSame(selectedDateTime, 'minute')
//           );

//           if (!isDuplicate) {
//             const newSchedule: IMedicine = {
//               ...schedule,
//               selectedDateTime: selectedDateTime.toDate(),
//             };

//             allSchedules.push(newSchedule);
//           }
//         });

//         // Add the specified interval to the current date
//         currentDate.add(interval, 'days'); // Add the given interval
//       }
//     }

//     return allSchedules;
// };

export { multiScheduleMaker };

[
  {
    medicineName: 'Tskdhum',
    medicineStatus: 'week',
    takeStatus: '',
    doseQuantity: '2',
    doseTime: '3:56 PM',
    strengthMed: '2',
    unitMed: 'mg',
    typeMed: 'Tablet',
    medicineId: '',
    medicineLocalId: '3e43ad0a-ae11-4077-b939-e7ff628f94b5',
    createdDate: '2024-12-02 15:56:54',
    selectedDateTime: '2024-04-01T09:56:00.000Z'
  },
  {
    medicineName: 'Tskdhum',
    medicineStatus: 'week',
    takeStatus: '',
    doseQuantity: '2',
    doseTime: '3:56 PM',
    strengthMed: '2',
    unitMed: 'mg',
    typeMed: 'Tablet',
    medicineId: '',
    medicineLocalId: '3e43ad0a-ae11-4077-b939-e7ff628f94b5',
    createdDate: '2024-12-02 15:56:54',
    selectedDateTime: '2024-04-02T09:56:00.000Z'
  },
  {
    medicineName: 'Tskdhum',
    medicineStatus: 'week',
    takeStatus: '',
    doseQuantity: '2',
    doseTime: '3:56 PM',
    strengthMed: '2',
    unitMed: 'mg',
    typeMed: 'Tablet',
    medicineId: '',
    medicineLocalId: '3e43ad0a-ae11-4077-b939-e7ff628f94b5',
    createdDate: '2024-12-02 15:56:54',
    selectedDateTime: '2024-04-03T09:56:00.000Z'
  }
];
('2024-04-01T09:59:00.000Z');
