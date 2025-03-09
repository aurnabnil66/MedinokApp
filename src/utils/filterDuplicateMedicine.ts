import { IMedicine } from "@/store/slices/features/medicineDetails/types";

const filterDuplicateMedicines = (medicines: IMedicine[]): IMedicine[] => {
    const uniqueSet = new Set<string>();
    const filteredMedicines: IMedicine[] = [];

    medicines.forEach((medicine) => {
        // Create a unique key using medicineLocalId, medicineName, and doseTime
        const uniqueKey = `${medicine.medicineLocalId}-${medicine.medicineName}-${medicine.doseTime}`;

        if (!uniqueSet.has(uniqueKey)) {
            uniqueSet.add(uniqueKey);
            filteredMedicines.push(medicine);
        }
    });

    return filteredMedicines;
};


export default filterDuplicateMedicines