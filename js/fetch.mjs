export async function apiCall(url, options = {method: "POST"}) {
  try {
    const fetchOptions = {
      ...options, 
      headers: {  'Content-Type': 'application/json' },
    };
    const respons = await fetch(url, fetchOptions);
    const json = await respons.json();
    return json;
  } catch (error) {
    console.error("Something went wrong..")
  }
}