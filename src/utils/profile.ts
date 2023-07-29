
// Create a function to get the user's profile


class UserProfile {
    private name: string;
    private age: number;
    private email: string;
    private profilePicture: null;
    private socialMediaLinks: {};
    constructor(name: string, age: number, email: string) {
    this.name = name;
    this.age = age;
    this.email = email;
    this.profilePicture = null;
    this.socialMediaLinks = {};
  }

  setName(name: string) {
    this.name = name;
  }

  setAge(age: number) {
    this.age = age;
  }

  setEmail(email: string) {
    this.email = email;
  }

  // @ts-ignore
    setProfilePicture(url) {
    this.profilePicture = url;
  }

  // @ts-ignore
    addSocialMediaLink(platform, url) {
    // @ts-ignore
        this.socialMediaLinks[platform] = url;
  }

  getProfilePicture() {
    return this.profilePicture;
  }

  getSocialMediaLinks() {
    return this.socialMediaLinks;
  }

  getFullProfile() {
    return {
      name: this.name,
      age: this.age,
      email: this.email,
      profilePicture: this.profilePicture,
      socialMediaLinks: this.socialMediaLinks,
    };
  }
}

module.exports = UserProfile;
