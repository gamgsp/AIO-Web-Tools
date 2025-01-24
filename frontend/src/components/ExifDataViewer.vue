<template>
  <div class="tool-page">
    <h2 class="text-3xl font-bold mb-4">EXIF Data Viewer</h2>
    <p class="text-lg mb-6">
      <strong>Description</strong>: The EXIF Data Viewer allows you to view the metadata embedded in your images, such as camera settings, location, and date taken.
    </p>
    <p class="text-lg mb-6"><strong>Usage Example:</strong></p>
    <div class="tool-example">
      <div class="example-section">
        <h4 class="text-lg font-bold mb-2">Example Image:</h4>
        <pre class="bg-gray-100 p-2 rounded">
Use this tool to view EXIF data of your uploaded images.
        </pre>
      </div>
    </div>
    <div class="tool-form mb-6">
      <form @submit.prevent="viewExifData" enctype="multipart/form-data">
        <div class="form-group mb-4">
          <label
            for="image"
            class="block text-gray-700 text-sm font-bold mb-2"
          >
            Upload Image:
          </label>
          <input
            id="image"
            type="file"
            @change="handleFileUpload"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div class="tool-actions">
          <button
            type="submit"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            :disabled="loading"
          >
            <span v-if="loading" class="spinner-border"></span>
            <span v-else>View EXIF Data</span>
          </button>
        </div>
      </form>
    </div>
    <div v-if="formattedExifData" class="generated-info mt-4 text-center">
      <h3 class="text-2xl font-bold mb-2">EXIF Data</h3>
      <table
        class="bg-gray-100 p-2 rounded w-full mx-auto text-left"
      >
        <tr v-for="(value, key) in formattedExifData" :key="key">
          <td class="font-bold">{{ key }}:</td>
          <td>{{ value }}</td>
        </tr>
      </table>
    </div>
    <p v-if="error" class="error text-red-500">{{ error }}</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ExifDataViewer",
  data() {
    return {
      image: null,
      exifData: "",
      error: "",
      loading: false,
    };
  },
  computed: {
    formattedExifData() {
      if (!this.exifData) return {};
      const data = JSON.parse(this.exifData);
      const formatted = {};

      if (data.tags) {
        for (const [key, value] of Object.entries(data.tags)) {
          formatted[key] = value;
        }
      }
      if (data.imageSize) {
        formatted["Image Width"] = data.imageSize.width;
        formatted["Image Height"] = data.imageSize.height;
      }
      if (data.thumbnailOffset) {
        formatted["Thumbnail Offset"] = data.thumbnailOffset;
      }
      if (data.thumbnailLength) {
        formatted["Thumbnail Length"] = data.thumbnailLength;
      }
      if (data.thumbnailType) {
        formatted["Thumbnail Type"] = data.thumbnailType;
      }
      if (data.app1Offset) {
        formatted["App1 Offset"] = data.app1Offset;
      }
      if (data.startMarker && data.startMarker.offset !== undefined) {
        formatted["Start Marker Offset"] = data.startMarker.offset;
      }

      return formatted;
    },
  },
  methods: {
    handleFileUpload(event) {
      this.image = event.target.files[0];
    },
    async viewExifData() {
      this.loading = true;
      this.error = "";
      this.exifData = "";
      const formData = new FormData();
      formData.append("image", this.image);

      try {
        const response = await axios.post(
          "http://localhost:5000/api/exif-data",
          formData
        );
        this.exifData = JSON.stringify(response.data);
      } catch (error) {
        this.error = `Error: ${
          error.response ? error.response.data.message : error.message
        }`;
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
@import "@/assets/toolstyles.css";

.break-words {
  word-break: break-word;
}
</style>