import { fetchNotifications } from '@/lib/domain'
import MarkAsReadButton from '@/components/ui/mark-as-read-button';

export default async function NotificationPage() {

    const notifications = await fetchNotifications();

    return (
        <div className={`max-w-xl mx-auto p-6 `} >
            <h1 className="text-2xl font-bold mb-6">Notifications</h1>

            {notifications.length === 0 ? (
                <div className="text-gray-500">
                    No Notifications...
                </div>
            ) : (
                <div className="space-y-4">
                    {notifications.map((notification) => {

                        const formattedDate = new Date(notification.createdAt)
                            .toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            });

                        return (

                            <div
                                key={notification.id}
                                className={`p-4 rounded-lg border transition ${notification.isRead
                                    ? "bg-gray-50"
                                    : "bg-white shadow font-medium"
                                    }`}
                            >
                                <div className="flex justify-between items-center">
                                    <p>{notification.message}</p>
                                    <span className="text-xs text-gray-500">
                                        {notification.type}
                                    </span>
                                    <MarkAsReadButton notificationId={notification.id} />

                                </div>

                                <div className="text-xs text-gray-400 mt-2">
                                    {formattedDate}
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}