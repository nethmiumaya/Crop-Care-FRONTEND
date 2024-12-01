import { Staff } from "../db/DB.js";

export function saveStaff(customer) {
  Staff.push(customer);
}

export function getAllStaff() {
  return Staff;
}

export function updateStaff(index, staff) {
  Staff[index] = staff;
}

export function deleteStaff(index) {
  Staff.splice(index, 1);
}
