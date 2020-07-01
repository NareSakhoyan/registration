<template>
    <b-field class="container">
        <section>
            <form>
                <b-field label="Name" label-position="on-border">
                    <b-input v-model="user.name" placeholder="Kevin"></b-input>
                </b-field>

                <b-field label="Surname" label-position="on-border">
                    <b-input v-model="user.surname" placeholder="Garvey"></b-input>
                </b-field>

                <b-field label="Gender" label-position="inline">
                   <div class="block">
                       <b-radio v-model="gender"
                                name="gender"
                                native-value="male">
                           Male
                       </b-radio>
                       <b-radio v-model="gender"
                                name="gender"
                                native-value="female">
                           Female
                       </b-radio>
                       <b-radio v-model="gender"
                                name="gender"
                                native-value="other">
                           Other
                       </b-radio>
                   </div>
                </b-field>

                <b-field label="Nationality" label-position="on-border">
                    <b-select v-model="user.nationality" placeholder="Select your nationality" expanded>
                        <option v-for="(nation, index) in nations"
                                :value="nation"
                                :key="index">
                            {{nation}}
                        </option>
                    </b-select>
                </b-field>
   3w
                <b-field label="Country" label-position="on-border">
                    <b-select v-model="user.country" placeholder="Select your country" expanded>
                        <option v-for="(country, index) in countries"
                                :value="country"
                                :key="index">
                            {{country}}
                        </option>
                    </b-select>
                </b-field>

                <b-field label="Address" label-position="on-border">
                    <b-input v-model="user.address" placeholder="711-2880 Nulla St. Mankato"></b-input>
                </b-field>

                <b-field label="Phone" label-position="on-border">
                    <b-input v-model="user.phone" placeholder="+3740000000"></b-input>
                </b-field>

                <b-field label="Email" label-position="on-border">
                    <b-input v-model="user.email" type="email" placeholder="john@" maxlength="30"></b-input>
                </b-field>

                <b-field class="linksContainer" label="YouTube link" label-position="on-border">
                    <b-field class="link">
                        <b-input v-model="user.youtubeLinks[0]" placeholder="http://youtube.com/qpwiu" expanded></b-input>
                        <ion-icon class="icon" name="add-outline" @click="addLink"></ion-icon>
                    </b-field>
                </b-field>

                <b-field>
                    <b-upload v-if="!user.image"
                              v-model="user.image"
                              drag-drop>
                        <section class="section">
                            <div class="content has-text-centered">
                                <p>
                                    <b-icon
                                            icon="upload"
                                            size="is-large">
                                    </b-icon>
                                </p>
                                <p>Drop your image here or click to upload</p>
                            </div>
                        </section>
                    </b-upload>

                    <div v-if='user.image' class="imageSrc">
                        <span class="tag is-primary" >
                            {{user.image.name}}
                            <button class="delete is-small"
                                    type="button"
                                    @click="deleteDropFile">
                            </button>
                        </span>
                    </div>
                </b-field>

                <div class="buttons">
                    <b-button @click="register" type="is-primary" expanded>Register</b-button>
                </div>
            </form>
        </section>
    </b-field>
</template>

<script>
    export default {
        name: "Registration",
        data() {
            return {
                nations: this.$store.state.register.nations,
                countries: this.$store.state.register.countries,
                user: {
                    name: '',
                    surname: '',
                    phone: '',
                    email: '',
                    gender: '',
                    nationality: '',
                    country: '',
                    address: '',
                    youtubeLinks: [],
                    image: ''
                },
            }
        },
        computed: {
            gender: {
                get() {
                    return ''
                },
                set(value) {
                    this.user.gender = value
                    console.log(value)
                }
            }
        },
        methods: {
            register() {
                console.log('somthign', this.user);
                if (this.user.name && this.user.surname && this.user.phone && this.user.gender && this.user.nationality && this.user.country && this.user.address && this.user.image) {
                    console.log(this.user)
                }
            },
            addLink() {
                if (this.user.youtubeLinks.length === 5) {

                    return
                }
                const link = document.createElement('div')
                link.setAttribute('class', 'field has-addons link')
                link.style['display'] = 'flex'
                link.style['flex-direction'] = 'row';
                link.style['align-items'] = 'center';

                // const elem = document.createElement('input')
                // elem.setAttribute('expanded', 'true')
                // elem.setAttribute('type', 'text')
                // elem.setAttribute('autocomplete', 'on')
                // elem.setAttribute('placeholder', 'http://youtube.com/qpwiu')
                // elem.setAttribute('class', 'input')
                // elem.setAttribute('v-model', `user.youtubeLinks[${this.user.youtubeLinks.length}]`)
                //
                // const button = document.createElement('ion-icon')
                // button.setAttribute('name', 'close-outline')
                // button.style['font-size'] = '24px';
                // button.style['margin'] = '0 -27px 0 3px';
                // button.addEventListener('click', this.removeLink)
                //
                // link.appendChild(elem)
                // link.appendChild(button)

                link.innerHTML = `
                        <b-input v-model="user.youtubeLinks[${this.user.youtubeLinks.length}]" placeholder="http://youtube.com/qpwiu" expanded></b-input>
                        <ion-icon class="icon" name="close-outline" @click="removeLink"></ion-icon>`

                const container = document.getElementsByClassName('linksContainer')[0]
                container.appendChild(link)
            },
            removeLink(e) {
                const container = document.getElementsByClassName('linksContainer')[0]
                container.removeChild(e.target.parentNode)
            },
            deleteDropFile() {
                this.user.image = ''
            }
        }
    }
</script>

<style scoped>
    @import "https://unpkg.com/ionicons@4.5.10-0/dist/css/ionicons.min.css";
    .container {
        margin: 100px;
    }
    .icon {
        font-size: 24px;
        margin: 0 -27px 0 3px;
    }
    .linksContainer {
        display: flex;
        flex-direction: column;
    }
    .link {
        display: flex;
        flex-direction: row;
        align-items: center;
    }
</style>