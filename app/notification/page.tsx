import React from 'react'
import { fetchNotifications } from '@/lib/domain'

export default async function NotificationPage() {

    const notifications = await fetchNotifications();


    console.log(notifications)

    return (
        <div>
            {notifications.length === 0 ? (
                <div>No Notifications...</div>
            ): (
                <div>
                    {notifications.map(notification) => (
                        <div key={notification.id}></div>
                    )}
                </div>
            )}

        </div >
    )
}
