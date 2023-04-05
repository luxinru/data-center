<template>
  <div class="x_table">
    <table>
      <thead>
        <tr>
          <th v-if="isRank">排名</th>
          <th
            v-for="(item, index) in columns"
            :key="index"
            :style="{
              width: item.width ? item.width : 'auto',
              flex: item.width ? 'none' : '1 0',
            }"
          >
            {{ item.name }}
          </th>
        </tr>
      </thead>

      <tbody :id="autoScrollId">
        <tr
          v-for="(item, index) in tableData"
          :key="index"
          @click="onRowClick(item)"
        >
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
            :style="{
              color: label.color || '#fffefe',
              width: label.width ? label.width : 'auto',
              flex: label.width ? 'none' : '1 0',
              textAlign: label.align || 'center'
            }"
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
        return []
      }
    },

    tableData: {
      type: Array,
      default () {
        return []
      }
    },

    /**
     * 传入id表格自动滚动
     */
    autoScrollId: {
      type: String,
      default: 'tbody1'
    }
  },

  mounted () {
    this.autoScroll()
  },

  methods: {
    autoScroll () {
      const scrollContainer = document.getElementById(this.autoScrollId)

      // Automatically scroll the container every 2 seconds
      let intervalId = setInterval(function () {
        scrollContainer.scrollTop += 1 // Adjust the amount of scrolling here
        if (
          scrollContainer.scrollTop ===
          scrollContainer.scrollHeight - scrollContainer.clientHeight
        ) {
          scrollContainer.scrollTop = 0
        }
      }, 60)

      // Pause scrolling when the mouse is over the container
      scrollContainer.addEventListener('mouseover', function () {
        clearInterval(intervalId)
      })

      // Resume scrolling when the mouse leaves the container
      scrollContainer.addEventListener('mouseout', function () {
        intervalId = setInterval(function () {
          scrollContainer.scrollTop += 1 // Adjust the amount of scrolling here
          if (
            scrollContainer.scrollTop ===
            scrollContainer.scrollHeight - scrollContainer.clientHeight
          ) {
            scrollContainer.scrollTop = 0
          }
        }, 60)
      })
    },
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
      padding-right: 10px;

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

      &:hover {
        animation-play-state: paused;
      }

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

        &:hover {
          background-color: #071e50;
        }
      }
    }
  }
}
</style>
