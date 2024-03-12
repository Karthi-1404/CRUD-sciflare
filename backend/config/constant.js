'use strict';

export default  Object.freeze({
    error: {
        auth: {
            userNotFound: 'User not found',
            invalidToken: 'Invalid Token',
            invalidCredentials: 'Invalid user credentials',
            invalidUser: 'Invalid User',
            unauthorized: 'Unauthorized',
            userAlreadyExist: 'User with email already exists',
            oldPasswordNotMatched: 'Old password is not matched',
            confirmPasswordNotMatched: 'Confirm password is not matched'
        },
        user: {
            accessDenied: 'Admin role can not be changed'
        },

    },
    userRole: {
        admin: 'admin',
        user: 'user',
    }
});

