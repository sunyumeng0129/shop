<template>
  <div class="dps">
    <van-empty
      image="error"
      description="小主还没有买任何商品哦~"
      v-show="!newarr.length"
    />
    <dl v-for="(item, index) in newarr" :key="index" class="cardl">
      <dt>
        <img :src="item.imgUrl" alt />
      </dt>
      <dd>
        <b>{{ item.pname }}</b>
        <li>
          <span style="color: red">￥{{ item.sale_price }}</span>
        </li>
        <p>
          <button @click="DEL_TJ(index)" class="delbtn">取消</button>
        </p>
      </dd>
    </dl>
    <div class="bottom">
      <button @click="no" class="nobox">取消付款</button>
      <button @click="ok" class="okbox">付款</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "Dps",
  data() {
    return {
      okk: false,
      noo: false,
    };
  },
  computed: {
    ...mapState(["tjarr", "nogivearr", "newarr"]),
  },
  created() {
    console.log(this.okk);
    console.log(this.noo);
  },

  methods: {
    ...mapMutations(["DEL_TJ", "NOGIVE_DD", "GIVE_DD"]),
    ok() {
      this.okk = true;
      if (this.okk == true) {
        this.GIVE_DD();
        this.$router.push("/index/my");
      } else {
        this.no();
      }
    },
    no() {
      this.noo = true;
      if (this.noo == true) {
        this.NOGIVE_DD();
        this.$router.push("/index/my");
      } else {
        this.ok();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.cardl {
  display: flex;
  margin: 20px;
  dt {
    margin-left: 20px;
    margin-right: 20px;
  }
  dd {
    display: flex;
    flex-direction: column;
    b {
      margin-bottom: 20px;
    }
    p {
      margin: 2px 0;
      display: flex;
    }
  }
}
img {
  width: 80px;
  height: 80px;
}
.delbtn {
  width: 50px;
  height: 25px;
  border-radius: 5%;
  border: none;
  outline: none;
  background: rgba(204, 204, 204, 0.308);
  margin-left: 150px;
}
.bottom {
  width: 100%;
  height: 50px;
  position: fixed;
  bottom: 50px;
  button {
    width: 50%;
    height: 100%;
    outline: none;
    border: solid 1px white;
    background: rgb(223, 5, 5);
    color: white;
  }
}
</style>