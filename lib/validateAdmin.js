export function validateAdmin(userId) {
  if (userId === process.env.ADMIN_ID || userId === process.env.ADMIN_ID2) {
    return true;
  }

  return false;
}
