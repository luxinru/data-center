<template>
  <div class="x_table">
    <table>
      <thead>
        <tr>
          <th v-if="isRank">排名</th>
          <th v-for="(item, index) in columns" :key="index">
            {{ item.name }}
          </th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(item, index) in tableData" :key="index" @click="onRowClick(item)">
          <td v-if="isRank" class="rank">
            <img v-if="index === 0" src="@/assets/images/no-1.png" alt="" />
            <img
              v-else-if="index === 1"
              src="@/assets/images/no-2.png"
              alt=""
            />
            <img
              v-else-if="index === 2"
              src="@/assets/images/no-3.png"
              alt=""
            />
            <span v-else>
              {{ index }}
            </span>
          </td>
          <td
            v-for="(label, j) in columns"
            :key="j"
            :class="{ isNumber: label.isNumber }"
            :style="{ color: label.color || '#fffefe'}"
          >
            <span :title="item[label.value]">
              {{ item[label.value] }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'XTable',

  props: {
    isRank: {
      type: Boolean,
      default: true
    },

    columns: {
      type: Array,
      default () {
        return [
          {
            name: '商品名称',
            value: 'b'
          },
          {
            name: '产地',
            value: 'c'
          },
          {
            name: '商品名',
            value: 'd'
          },
          {
            name: '销量',
            value: 'e',
            isNumber: true
          },
          {
            name: '金额',
            value: 'f',
            isNumber: true
          },
          {
            name: '评分',
            value: 'g'
          }
        ]
      }
    },

    tableData: {
      type: Array,
      default () {
        return [
          {
            b: '【苏泊尔 电烤箱K30FK6】',
            c: '江西',
            d: '南昌自营',
            e: '2',
            f: '789.63',
            g: '95'
          },
          {
            b: '【苏泊尔 电烤箱K30FK6】',
            c: '江西',
            d: '南昌自营',
            e: '2',
            f: '789.63',
            g: '95'
          },
          {
            b: '【苏泊尔 电烤箱K30FK6】',
            c: '江西',
            d: '南昌自营',
            e: '2',
            f: '789.63',
            g: '95'
          },
          {
            b: '【苏泊尔 电烤箱K30FK6】',
            c: '江西',
            d: '南昌自营',
            e: '2',
            f: '789.63',
            g: '95'
          },
          {
            b: '【苏泊尔 电烤箱K30FK6】',
            c: '江西',
            d: '南昌自营',
            e: '2',
            f: '789.63',
            g: '95'
          },
          {
            b: '【苏泊尔 电烤箱K30FK6】',
            c: '江西',
            d: '南昌自营',
            e: '2',
            f: '789.63',
            g: '95'
          },
          {
            b: '【苏泊尔 电烤箱K30FK6】',
            c: '江西',
            d: '南昌自营',
            e: '2',
            f: '789.63',
            g: '95'
          },
          {
            b: '【苏泊尔 电烤箱K30FK6】',
            c: '江西',
            d: '南昌自营',
            e: '2',
            f: '789.63',
            g: '95'
          },
          {
            b: '【苏泊尔 电烤箱K30FK6】',
            c: '江西',
            d: '南昌自营',
            e: '2',
            f: '789.63',
            g: '95'
          },
          {
            b: '【苏泊尔 电烤箱K30FK6】',
            c: '江西',
            d: '南昌自营',
            e: '2',
            f: '789.63',
            g: '95'
          },
          {
            b: '【苏泊尔 电烤箱K30FK6】',
            c: '江西',
            d: '南昌自营',
            e: '2',
            f: '789.63',
            g: '95'
          },
          {
            b: '【苏泊尔 电烤箱K30FK6】',
            c: '江西',
            d: '南昌自营',
            e: '2',
            f: '789.63',
            g: '95'
          },
          {
            b: '【苏泊尔 电烤箱K30FK6】',
            c: '江西',
            d: '南昌自营',
            e: '2',
            f: '789.63',
            g: '95'
          },
          {
            b: '【苏泊尔 电烤箱K30FK6】',
            c: '江西',
            d: '南昌自营',
            e: '2',
            f: '789.63',
            g: '95'
          },
          {
            b: '【苏泊尔 电烤箱K30FK6】',
            c: '江西',
            d: '南昌自营',
            e: '2',
            f: '789.63',
            g: '95'
          },
          {
            b: '【苏泊尔 电烤箱K30FK6】',
            c: '江西',
            d: '南昌自营',
            e: '2',
            f: '789.63',
            g: '95'
          },
          {
            b: '【苏泊尔 电烤箱K30FK6】',
            c: '江西',
            d: '南昌自营',
            e: '2',
            f: '789.63',
            g: '95'
          },
          {
            b: '【苏泊尔 电烤箱K30FK6】',
            c: '江西',
            d: '南昌自营',
            e: '2',
            f: '789.63',
            g: '95'
          },
          {
            b: '【苏泊尔 电烤箱K30FK6】',
            c: '江西',
            d: '南昌自营',
            e: '2',
            f: '789.63',
            g: '95'
          },
          {
            b: '【苏泊尔 电烤箱K30FK6】',
            c: '江西',
            d: '南昌自营',
            e: '2',
            f: '789.63',
            g: '95'
          }
        ]
      }
    }
  },

  methods: {
    onRowClick (row) {
      this.$emit('onRowClick', row)
    }
  }
}
</script>

<style lang="less" scoped>
.x_table {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;

  table {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;

    thead {
      position: sticky;
      top: 0;
      width: 100%;
      height: 40px;
      background-color: #071e50;
      flex-shrink: 0;

      tr {
        width: 100%;
        height: 100%;
        display: flex;

        th {
          flex: 1 0;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #fffefe;
        }
      }
    }

    tbody {
      width: 100%;
      flex: 1 0;
      overflow-y: auto;
      display: flex;
      flex-direction: column;

      tr {
        width: 100%;
        height: 40px;
        display: flex;
        margin-top: 7px;
        background-color: #051645;
        flex-shrink: 0;
        cursor: pointer;

        td {
          flex: 1 0;
          height: 100%;
          line-height: 40px;
          text-align: center;
          font-size: 17px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #fffefe;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }

        .rank {
          font-size: 18px;
          font-family: Impact;
          font-weight: 400;
          font-style: italic;
          color: #0dedf7;
        }

        .isNumber {
          font-size: 24px;
          font-family: YouSheBiaoTiHei;
          font-weight: 400;
          color: #00baff;
        }
      }
    }
  }
}
</style>
