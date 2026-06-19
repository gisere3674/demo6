# Privacy Policy for "What IS THAT?"

**Last Updated:** June 2026

Thank you for using the "What IS THAT?" Chrome Extension ("the Extension"). We are committed to protecting your privacy and ensuring that your data is handled securely. This Privacy Policy outlines what data the Extension collects, how it is used, and how it is stored.

## 1. Data We "Collect" and How We Use It
The Extension is designed to be a 100% Bring-Your-Own-Key (BYOK) privacy-focused tool. We do not operate any backend servers, nor do we track, collect, or store your personal data on external servers. 

However, for the Extension to function, it handles the following data locally on your device:

*   **API Keys (Authentication Information):** You must provide your own API keys for the AI providers you wish to use (e.g., OpenAI, Anthropic, Google, etc.). 
*   **Website Content (Highlighted Text):** When you highlight text on a webpage and activate the Extension, it reads the specific text you selected in order to generate an explanation.

## 2. How Your Data is Stored
*   **Local Storage Only:** Your API keys, selected models, and preferences are stored exclusively on your device using the `chrome.storage.local` API. This data never leaves your computer unless it is actively being used to query the AI provider you selected.
*   **No Databases:** We do not maintain any databases, logs, or records of your API keys or the texts you highlight.

## 3. Data Transmission to Third Parties
The Extension does not sell, trade, or transfer your data to any unapproved third parties.

When you request an explanation for a highlighted text, the Extension transmits your **Highlighted Text** and your **API Key** directly and securely to the official endpoint of the **specific AI Provider you have selected** (e.g., sending data directly to `api.openai.com` if you chose ChatGPT). 

We strongly encourage you to review the privacy policies of the AI providers you choose to use with this Extension, as their handling of your prompts and API keys will be governed by their respective policies.

## 4. Analytics and Tracking
The Extension does NOT use Google Analytics, cookies, or any other tracking scripts. We do not monitor your browsing history or track your usage habits.

## 5. Changes to This Privacy Policy
We may update our Privacy Policy from time to time. Since we do not collect your email address, any updates to this policy will be reflected on our Chrome Web Store page and GitHub repository. 

## 6. Contact Us
If you have any questions or concerns about this Privacy Policy, please reach out via the support tab on the Chrome Web Store.
