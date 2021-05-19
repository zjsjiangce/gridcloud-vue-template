/*
 * @作者: wrr (wangruirui@hztianque.com)
 * @描述:
 * @Date: 2021-04-27 10:51:29
 */
const Tpl = () => import('./views')
const TplHome = () => import('./views/children/home')
const TplComponents = () => import('./views/children/components')

import layout from '@/components/Layout'

export default () => ({
  path: '/tpl',
  component: Tpl,
  redirect: '/tpl/home',
  meta: { layout },
  children: [
    {
      path: '/tpl/home',
      component: TplHome,
    },
    {
      path: '/tpl/components',
      component: TplComponents,
    },
  ],
})
