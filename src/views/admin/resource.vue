<template>
    <div>
    <!--页面区域-->
    <div class="page-view">
        <div class="table-operations">
        <a-space>
            <a-button type="primary" @click="handleAdd">新增</a-button>
            <a-button @click="handleBatchDelete">批量删除</a-button>
            <a-input-search addon-before="教师id" enter-button @search="onSearch" @change="onSearchChange" />
        </a-space>
        </div>
        <a-table
        size="middle"
        rowKey="id"
        :loading="data.loading"
        :columns="columns"
        :data-source="data.resourceList"
        :scroll="{ x: 'max-content' }"
        :row-selection="rowSelection"
        :pagination="{
            size: 'default',
            current: data.page,
            pageSize: data.pageSize,
            onChange: (current) => (data.page = current),
            showSizeChanger: false,
            showTotal: (total) => `共${total}条数据`,
        }"
        >
        <template #bodyCell="{ text, record, index, column }">
        <template v-if="column.key === 'imageUrl'">
            <img :src="text" style="width: 60px;height: 40px;"/>
        </template>
        <template v-if="column.key === 'operation'">
            <span>
            <a @click="handleEdit(record)">编辑</a>
            <a-divider type="vertical"/>
            <a-popconfirm title="确定删除?" ok-text="是" cancel-text="否" @confirm="confirmDelete(record)">
                <a href="#">删除</a>
            </a-popconfirm>
            </span>
        </template>
        </template>
    </a-table>
    </div>  

    <!--弹窗区域-->
    <div>
        <a-modal
        :visible="modal.visile"
        :forceRender="true"
        :title="modal.title"
        ok-text="确认"
        cancel-text="取消"
        @cancel="handleCancel"
        @ok="handleOk"
        >
        <div>
            <a-form ref="myform" :label-col="{ style: { width: '80px' } }" :model="modal.form" :rules="modal.rules">
            <a-row :gutter="24">
                <a-col span="24">
                <a-form-item label="文件地址" name="link">
                    <a-input :disabled="modal.editFlag" placeholder="请输入" v-model:value="modal.form.id" allowClear />
                </a-form-item>
                </a-col>
                <a-col span="24">
                <a-form-item label="上传家教的id" name="tid">
                    <a-input :disabled="modal.editFlag" placeholder="请输入" v-model:value="modal.form.tid" allowClear />
                </a-form-item>
                </a-col>
            </a-row>
            </a-form>
        </div>
        </a-modal>
    </div>
    </div>
</template>

<script setup lang="ts">
    import { FormInstance, message } from 'ant-design-vue';
    import { createApi, listApi, updateApi, deleteApi } from '/@/api/resource';
    import {getFormatTime} from "/@/utils";

    const columns = reactive([
    {
        title: '序号',
        dataIndex: 'index',
        key: 'index',
        align: 'center',
    },
    {
        title: '文件地址',
        dataIndex: 'link',
        key: 'link',
        align: 'center',
    },
    {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
        align: 'center',
        customRender: ({text}) => getFormatTime(text, true)
    },
    {
        title: '上传家教的id',
        dataIndex: 'tid',
        key: 'tid',
        align: 'center',
    },
    ]);

    const beforeUpload = (file: File) => {
    // 改文件名
    const fileName = new Date().getTime().toString() + '.' + file.type.substring(6);
    const copyFile = new File([file], fileName);
    console.log(copyFile);
    modal.form.cover = copyFile;
    return false;
    };

    const fileList = ref([]);

    // 页面数据
    const data = reactive({
    resourceList: [],
    loading: false,
    currentAdminresourceName: '',
    keyword: '',
    selectedRowKeys: [] as any[],
    pageSize: 10,
    page: 1,
    });

    // 弹窗数据源
    const modal = reactive({
    visile: false,
    editFlag: false,
    title: '',
    form: {
        id: undefined,
        link: undefined,
        tid: undefined,
    },
    rules: {
        link: [{ required: true, message: '请输入', trigger: 'change' }],
        tid: [{ required: true, message: '请输入', trigger: 'change' }],
    },
    });

    const myform = ref<FormInstance>();

    onMounted(() => {
    getresourceList();
    });

    const getresourceList = () => {
    data.loading = true;
    listApi({
        keyword: data.keyword,
    })
        .then((res) => {
        data.loading = false;
        console.log(res);
        res.data.forEach((item: any, index: any) => {
            item.index = index + 1;
        });
        data.resourceList = res.data;
        })
        .catch((err) => {
        data.loading = false;
        console.log(err);
        });
    };


    const onSearch = () => {
    getresourceList();
    };

    const rowSelection = ref({
    onChange: (selectedRowKeys: (string | number)[], selectedRows: DataItem[]) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        data.selectedRowKeys = selectedRowKeys;
    },
    });

    const handleAdd = () => {
    resetModal();
    modal.visile = true;
    modal.editFlag = false;
    modal.title = '新增';
    // 重置
    for (const key in modal.form) {
        modal.form[key] = undefined;
    }
    };
    const handleEdit = (record: any) => {
    resetModal();
    modal.visile = true;
    modal.editFlag = true;
    modal.title = '编辑';
    // 重置
    for (const key in modal.form) {
        modal.form[key] = undefined;
    }
    for (const key in record) {
        modal.form[key] = record[key];
    }
    };

    const confirmDelete = (record: any) => {
    console.log('delete', record);
    deleteApi({ ids: record.id })
        .then((res) => {
        getresourceList();
        })
        .catch((err) => {
        message.warn(err.msg || "操作失败")
        });
    };

    const handleBatchDelete = () => {
    console.log(data.selectedRowKeys);
    if (data.selectedRowKeys.length <= 0) {
        console.log('hello');
        message.warn('请勾选删除项');
        return;
    }
    deleteApi({ ids: data.selectedRowKeys.join(',') })
        .then((res) => {
        message.success('删除成功');
        data.selectedRowKeys = [];
        getresourceList();
        })
        .catch((err) => {
        message.warn(err.msg || "操作失败")
        });
    };

    const handleOk = () => {
    myform.value
        ?.validate()
        .then(() => {
        const formData = new FormData();
        if (modal.form.id) {
            formData.append('id', modal.form.id);
        }
        if (modal.form.link) {
            formData.append('link', modal.form.link);
        }
        if (modal.form.tid) {
            formData.append('tid', modal.form.tid);
        }
        if (modal.editFlag) {
            updateApi(formData)
            .then((res) => {
                hideModal();
                getresourceList();
            })
            .catch((err) => {
                console.log(err);
                message.warn(err.msg || "操作失败")
            });
        } else {
            createApi(formData)
            .then((res) => {
                hideModal();
                getresourceList();
            })
            .catch((err) => {
                console.log(err);
                message.warn(err.msg || "操作失败")
            });
        }
        })
        .catch((err) => {
        console.log('不能为空');
        });
    };

    const handleCancel = () => {
    hideModal();
    };

    // 恢复表单初始状态
    const resetModal = () => {
    myform.value?.resetFields();
    };

    // 关闭弹窗
    const hideModal = () => {
    modal.visile = false;
    };
</script>

<style scoped lang="less">
    .page-view {
    min-height: 100%;
    background: #fff;
    padding: 24px;
    display: flex;
    flex-direction: column;
    }

    .table-operations {
    margin-bottom: 16px;
    text-align: right;
    }

    .table-operations > button {
    margin-right: 8px;
    }
</style>
