import React from 'react';

interface UserData {
    file_name: string;
    uploaded_at: string;
    status: string;
    total_rows: number;
    total_columns: number;
}
interface UserDataArray {
    data: UserData[]
}


const UserTable: React.FC<UserDataArray> = ({data}) => {
    return (
        <div className="relative mb-5">
            <table className="w-full text-sm text-left rtl:text-right text-darktext3 dark:text-darktext3">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-loginbg dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            File Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Date
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Status
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Total Rows
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Total Columns
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap overflow-hidden dark:text-white">
                                {item.file_name}
                            </th>
                            <td className="px-6 py-4">
                                {item.uploaded_at}
                            </td>
                            <td className={`px-6 py-4 ${item.status === "Success" ? 'text-green-600' : 'text-red-500'}`}>
                                {item.status}
                            </td>
                            <td className="px-6 py-4">
                                {item.total_rows}
                            </td>
                            <td className="px-6 py-4">
                                {item.total_columns}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default UserTable;
