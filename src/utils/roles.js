export const superAdminRole = 'SuperAdmin'
export const adminRole = 'Admin'
export const workingRole = 'Trabajando'

// Returns an array with all the roles this user has => [ 'SuperAdmin', ..., '@everyone' ]
export const getRoleNames = (member) => member.roles.cache.map((role) => role.name)
export const getRoleData = (member, roleName) =>
  member.guild.roles.cache.find((role) => role.name === roleName)

export const getUserHasWorkingRole = (member) => {
  const userRoles = getRoleNames(member)
  return userRoles.some((role) => role === workingRole)
}
export const addWorkingRoleToUser = (member) => {
  const workRoleData = getRoleData(member, workingRole)
  member.roles.add(workRoleData)
}
export const removeWorkingRoleFromUser = (member) => {
  const workRoleData = getRoleData(member, workingRole)
  member.roles.remove(workRoleData)
}
