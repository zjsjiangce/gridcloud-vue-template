const formJsons = [
  {
    id: 100,
    config: {
      'label-position': 'top',
      'label-colon': false,
      'gutter': 10,
    },
    schema: [
      {
        name: 'name',
        description: '姓名',
        type: 'string',
        layout: 12,
        form: {
          type: 'Input',
          placeholder: '请输入姓名',
        },
        validator: [
          {
            type: 'required',
          },
          {
            type: 'regex',
            regex: /^.{0,50}$/,
            message: '输入字符长度不能超过50位！',
          },
        ],
        controls: {
          disabled: {
            insert: false,
            update: false,
            view: true,
          },
          visible: {
            insert: false,
            update: false,
            view: true,
          },
        },
      },
      {
        name: 'sex',
        description: '性别',
        type: 'string',
        layout: 12,
        form: {
          type: 'Select',
          placeholder: '请选择性别',
          options: [
            { label: '男', value: '1' },
            { label: '女', value: '2' },
            { label: '其他', value: '3' },
          ],
        },
        config: {
          label: false,
        },
        validator: [
          {
            type: 'required',
          },
        ],
        controls: {
          disabled: {
            insert: false,
            update: false,
            view: true,
          },
          visible: {
            insert: false,
            update: false,
            view: true,
          },
        },
      },
      {
        name: 'birthday',
        description: '出生年月',
        type: 'string',
        layout: 12,
        form: {
          type: 'Date',
          placeholder: '请选择出生年月',
        },
        config: {
          label: false,
        },
        validator: [
          {
            type: 'required',
          },
        ],
        controls: {
          disabled: {
            insert: false,
            update: false,
            view: true,
          },
          visible: {
            insert: false,
            update: false,
            view: true,
          },
        },
      },
      {
        name: 'age',
        description: '年龄',
        type: 'string',
        layout: 12,
        form: {
          value: 0,
          type: 'InputNumber',
          placeholder: '请选择性别',
        },
        config: {
          label: false,
        },
        validator: [
          {
            type: 'required',
          },
        ],
        controls: {
          disabled: {
            insert: false,
            update: false,
            view: true,
          },
          visible: {
            insert: false,
            update: false,
            view: true,
          },
        },
      },
      {
        name: 'details',
        description: '简介',
        type: 'string',
        layout: 24,
        form: {
          type: 'Textarea',
          placeholder: '请输入简介',
        },
        validator: [
          {
            type: 'required',
          },
          {
            type: 'regex',
            regex: /^.{0,500}$/,
            message: '输入字符长度不能超过500位！',
          },
        ],
        controls: {
          disabled: {
            insert: false,
            update: false,
            view: true,
          },
          visible: {
            insert: false,
            update: false,
            view: true,
          },
        },
      },
    ],
    schemas: {
      'base-info': {
        name: 'base-info',
        schema: [
          {
            name: 'time',
            description: '时间',
            type: 'array',
            layout: 24,
            form: {
              type: 'Daterange',
              placeholder: '请选择时间',
            },
            config: {
              time: true,
              format: 'yyyy-MM-dd HH:mm',
            },
            validator: [
              {
                type: 'required',
              },
            ],
            controls: {
              disabled: {
                insert: false,
                update: false,
                view: true,
              },
              visible: {
                insert: false,
                update: false,
                view: true,
              },
            },
          },
          {
            name: 'address',
            description: '地点',
            type: 'string',
            layout: 24,
            form: {
              type: 'Input',
              placeholder: '请输入地点',
            },
            validator: [
              {
                type: 'required',
              },
              {
                type: 'regex',
                regex: /^.{0,50}$/,
                message: '输入字符长度不能超过50位！',
              },
            ],
            controls: {
              disabled: {
                insert: false,
                update: false,
                view: true,
              },
              visible: {
                insert: false,
                update: false,
                view: true,
              },
            },
          },
          {
            name: 'userMember',
            description: '参与人员',
            type: 'string',
            layout: 24,
            form: {
              type: 'Input',
              placeholder: '请输入参与人员',
            },
            validator: [
              {
                type: 'required',
              },
              {
                type: 'regex',
                regex: /^.{0,50}$/,
                message: '输入字符长度不能超过50位！',
              },
            ],
            controls: {
              disabled: {
                insert: false,
                update: false,
                view: true,
              },
              visible: {
                insert: false,
                update: false,
                view: true,
              },
            },
          },
        ],
      },
    },
  },
]

export { formJsons }