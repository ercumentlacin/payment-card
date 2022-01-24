export const paymentRequests = {
  check: async () => {
    const url = 'https://mocki.io/v1/a5ae8585-b42d-486b-a4ff-25ebfebbaddf';
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        return {
          data,
        };
      }
      return {
        error: true,
      };
    } catch (error) {
      return {
        error: true,
        message: error.message,
      };
    }
  },
};
