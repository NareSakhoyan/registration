<template>
    <b-field class="container">
        <section>
            <form v-if="!registered">
                <b-field label="Name" label-position="on-border">
                    <b-input v-model="user.name" placeholder="Kevin" validation-message="Name should be capitalized" pattern="[A-Z][a-z]*"></b-input>
                </b-field>

                <b-field label="Surname" label-position="on-border" >
                    <b-input v-model="user.surname" placeholder="Garvey" validation-message="Surname should be capitalized" pattern="[A-Z][a-z]*"></b-input>
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

                <b-field label="Date of birth" label-position="inline" validation-message="Name should be capitalized" pattern="[A-Z][a-z]*">
                    <b-datepicker v-model="user.birth"
                                  inline
                                  :unselectable-days-of-week="[0, 6]">
                    </b-datepicker>
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
                    <b-input type="number" v-model="user.phone" placeholder="+3740000000" validation-message="Input valid phone number" pattern="^\+?[0-9]*"></b-input>
                </b-field>

                <b-field label="Email" label-position="on-border">
                    <b-input v-model="user.email" type="email" placeholder="john@" maxlength="30"></b-input>
                </b-field>

                <b-field label="Password" label-position="on-border">
                    <b-input v-model="user.password"
                             type="password"
                             minlength="8"
                             maxlength="16"
                             password-reveal>
                    </b-input>
                </b-field>

                <b-field class="linksContainer" label="YouTube link" label-position="on-border" :key="update" >
                    <b-field v-for="(item, index) in user.youtubeLinks" :key="index">
                        <b-field v-if="index === 0" class="link">
                            <b-input v-model="item.value" placeholder="http://youtube.com/qpwiu" expanded validation-message="Input valid link" pattern="^\https?\\\\www.youtube.com\\\w*"></b-input>
                            <ion-icon class="icon" name="add-outline" @click="addLink"></ion-icon>
                        </b-field>
                        <b-field v-else class="link">
                            <b-input v-model="item.value" placeholder="http://youtube.com/qpwiu" expanded validation-message="Input valid link" pattern="^\https?\\\\www.youtube.com\\\w*"></b-input>
                            <ion-icon class="icon" name="remove-outline" @click="removeLink(item.id)"></ion-icon>
                        </b-field>

                    </b-field>
                </b-field>

                <b-field>
                    <b-upload v-if="!user.image"
                              v-model="user.image"
                              drag-drop>
                        <section class="section">
                            <div class="content has-text-centered">
                                <p>
                                    <b-icon extended
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
            <div v-else>
                succefully registered
            </div>
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
                update: 1,
                user: {
                    name: '',
                    surname: '',
                    phone: '',
                    email: '',
                    gender: '',
                    birth: '',
                    nationality: '',
                    country: '',
                    address: '',
                    youtubeLinks: [{id: 0, value: ''}],
                    image: '',
                    password: '',
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
            addZero(d) {
                if(0 <= d && d < 10) return "0" + d.toString();
                return d.toString()
            },
            async register() {
                if (this.user.name && this.user.surname && this.user.phone && this.user.gender && this.user.nationality && this.user.country && this.user.address && this.user.image && this.user.password) {
                    console.log(this.user)
                    const userSendToDb = {...this.user}
                    const file = {
                        name: userSendToDb.image.name,
                        lastModified: userSendToDb.image.lastModified,
                        lastModifiedDate: userSendToDb.image.lastModifiedDate,
                        size: userSendToDb.image.size,
                        type: userSendToDb.image.type,
                        webkitRelativePath: userSendToDb.image.webkitRelativePath,
                    }
                    userSendToDb.image = JSON.stringify(file)
                    userSendToDb.youtubeLinks = JSON.stringify(userSendToDb.youtubeLinks)
                    userSendToDb.birth = `${this.addZero(this.user.birth.getFullYear())}-${this.addZero(this.user.birth.getMonth())}-${this.addZero(this.user.birth.getDay())}`
                    const response = await this.$api.post('/player/', {userSendToDb})
                    if (response.status === 200) {
                        this.$buefy.toast.open({
                            message: 'You registered!',
                            type: 'is-success'
                        })
                    }
                    console.log(response, this.register);
                }
            },
            addLink() {
                if (this.user.youtubeLinks.length === 5) return;
                let index = this.user.youtubeLinks[this.user.youtubeLinks.length - 1].id + 1;
                this.user.youtubeLinks.push({id: index, value: ''});
                this.update += 1;
            },
            removeLink(e) {
                this.user.youtubeLinks = this.user.youtubeLinks.filter(item => {
                    return item.id !== e;
                })
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