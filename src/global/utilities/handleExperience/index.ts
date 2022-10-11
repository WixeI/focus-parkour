export function experienceBasePoints(currentExperience: number) {
  if (currentExperience < 1000) return 50;
  else return 100;
}
