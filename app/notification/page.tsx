import React from 'react'
import { fetchNotifications } from '@/lib/domain'

export default async function NotificationPage() {

    const notifications = await fetchNotifications();


    console.log(notifications)

    return (
        <div>
            {notifications.length === 0 ? (
                <div>No Notifications...</div>
            ) : (
                <div>
                    {notifications.map((notification) => (
                        <div key={notification.id}>
                            {notification.message}
                            <span>
                                {notification.type}
                            </span>
                            {new Date(notification.createdAt).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })}
                        </div>
                    ))}
                </div>
            )}

        </div >
    )
}
