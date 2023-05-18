// src/types/department.d.ts
// 一级科室类型
interface FirstLevelDepartment {
    id: string;
    name: string;
    child: SecondLevelDepartment[];
}
// 二级科室类型
type SecondLevelDepartment = { id: string; name: string; avatar: string };

// 服务端返回的科室类型
type DepartmentResponse = HealthResponse<FirstLevelDepartment[]>;