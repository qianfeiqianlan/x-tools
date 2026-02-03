/**
 * User Feature - User List Page
 */
import { useEffect } from "react";
import { getUserList } from "../api";
import { useUserStore } from "../store";

export function UserListPage() {
  const { list, setList, loading, setLoading } = useUserStore();

  useEffect(() => {
    setLoading(true);
    getUserList()
      .then((res) => {
        const data = res as { list: { id: string; username: string }[] };
        setList(data.list ?? []);
      })
      .catch(() => setList([]))
      .finally(() => setLoading(false));
  }, [setList, setLoading]);

  if (loading) {
    return (
      <div className="p-6 text-slate-500">加载中…</div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-lg font-medium text-slate-800 mb-4">用户列表</h2>
      <div className="rounded-lg border border-slate-200 bg-white overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="text-left py-3 px-4 font-medium text-slate-700">ID</th>
              <th className="text-left py-3 px-4 font-medium text-slate-700">用户名</th>
            </tr>
          </thead>
          <tbody>
            {list.length === 0 ? (
              <tr>
                <td colSpan={2} className="py-8 text-center text-slate-500">
                  暂无数据（可配置 mock 或后端接口）
                </td>
              </tr>
            ) : (
              list.map((u) => (
                <tr key={u.id} className="border-b border-slate-100 last:border-0">
                  <td className="py-3 px-4 text-slate-600">{u.id}</td>
                  <td className="py-3 px-4 text-slate-800">{u.username}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
