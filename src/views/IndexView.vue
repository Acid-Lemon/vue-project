<script>
export default {
  data() {
    return {
      contacts: [
        {
          name: "QQ",
          svg: "/svg/QQ.svg",
          link: "https://wpa.qq.com/msgrd?v=3&uin=3573045100&site=qq&menu=yes",
        },
        {
          name: "bilibili",
          svg: "/svg/哔哩哔哩.svg",
          link: "https://space.bilibili.com/400932209",
        },
      ],
    };
  },
};
</script>

<template>
  <div class="shouping juzhong shu">
    <img class="touxiang jiange" src="/头像.jpg" />
    <p class="jiange">Hello!欢迎来到lemon的个人网站~</p>
    <div class="heng juzhong">
      <div v-for="contact in contacts" class="jiange juzhong">
        <a :href="contact.link" target="_blank">
          <img class="lie" :title="contact.name" :src="contact.svg" />
        </a>
      </div>
    </div>
  </div>
  <div class="shu juzhong">
    <div class="gdtext juzhong heng"></div>
  </div>
</template>

<style scoped>
.shouping {
  width: 100%;
  height: 100%;
}

.touxiang {
  width: 130px;
  border-radius: 65px;
  transform: rotate(0);
  transition: all 0.6s;
}

.touxiang:hover {
  transform: rotate(360deg);
}

.jiange {
  margin: 10px;
}

p {
  font-family: SYST;
  color: #000000;
  transition: all 0.6s;
}

p:hover {
  color: #44cef6;
}

.heng {
  flex-direction: row;
}

.shu {
  flex-direction: column;
}

.lie {
  width: 30px;
}

.juzhong {
  display: flex;
  justify-content: center;
  align-items: center;
}

.gdtext {
  width: 95%;
  height: 50px;
  border: 1px solid #000000;
}
</style>
