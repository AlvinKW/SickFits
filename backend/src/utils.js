function hasPermission(user, permissionsNeeded) {
	const matchedPermissions = user.permissions.filter(permissionTheyHave => {
		return permissionsNeeded.includes(permissionTheyHave);
	});
	if (!matchedPermissions.length) {
		throw new Error(`You do not have sufficient permissions: ${permissionsNeeded}\nYou Have: ${user.permissions}`);
	}
}

exports.hasPermission = hasPermission;
