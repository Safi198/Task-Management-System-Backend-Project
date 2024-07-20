const roles = {
    admin: {
        can: [
            "create_user",
            "delete_user",
            "update_user",
            "read_user",
            "create_user",
            'create_task',
            "delete_task",
            "update_task",
            "read_task",
        ],
    },
    manager: {
        can: [
            'create_task',
            "create_user",
            "delete_task",
            "update_task",
            "read_task",
            "update_user",
            "read_user",
        ],
    },
    team_member: {
        can: ["read_task", "update_task", "create_comment", "read_user"],
    },
};

module.exports = roles;
