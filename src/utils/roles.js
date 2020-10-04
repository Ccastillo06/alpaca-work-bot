export const superAdminRole = 'SuperAdmin'
export const adminRole = 'Admin'
export const workingRole = 'Trabajando'

// Returns an array with all the roles this user has => [ 'SuperAdmin', ..., '@everyone' ]
export const getRoleNames = (message) => message.member.roles.cache.map((role) => role.name)
export const getRoleData = (message, roleName) =>
  message.member.guild.roles.cache.find((role) => role.name === roleName)

export const getUserHasWorkingRole = (message) => {
  const userRoles = getRoleNames(message)
  return userRoles.some((role) => role === workingRole)
}
export const addWorkingRoleToUser = (message) => {
  const workRoleData = getRoleData(message, workingRole)
  message.member.roles.add(workRoleData)
}
export const removeWorkingRoleFromUser = (message) => {
  const workRoleData = getRoleData(message, workingRole)
  message.member.roles.remove(workRoleData)
}
