<script setup>
  import { useRouter } from 'vue-router'

  const router = useRouter()
</script>
<template>
  <header class="header">
    <div class="header__wrapper">
      <div class="header__logo">
        <NuxtLink to="/">Project test</NuxtLink>
      </div>
      <div class="header__menus">
        <nav>
          <ul>
            <li>
              <NuxtLink to="/">Home</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/info">Infos</NuxtLink>
            </li>
          </ul>
        </nav>
      </div>
      <div class="header__search">
        <TheSearch :prependIcon="`search`" :placeholder="`Search`" />
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
  .header {
    display: block;
    min-height: 76px;
    padding-top: 76px;
    box-sizing: border-box;
    &__wrapper {
      display: flex;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 10;
      height: 76px;
      padding: 20px;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid var(--onbg-1);
      background-color: var(--bg-70);
      -webkit-backdrop-filter: blur(15px);
      -moz-backdrop-filter: blur(15px);
      backdrop-filter: blur(15px);
    }
    &__search {
      width: 230px;
    }
    &__logo {
      color: var(--bg-inverted);
      font-size: 34px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
    &__menus {
      nav {
        ul {
          display: flex;
          gap: 20px;
          li {
            list-style: none;
            a {
              font-size: 18px;
              font-style: normal;
              font-weight: 400;
              line-height: normal;
              color: var(--on-3);
              &.router-link-active,
              &.router-link-exact-active {
                color: var(--bg-inverted);
              }
            }
          }
        }
      }
    }
  }
</style>
