export default async function TestSuspense() {
    const user = await (async () => {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      
      return {
        name: "Jan Kowalski",
        email: "jan@example.com"
      };
    })();
  
    return (
      <div className="mt-4 p-4 border rounded">
        <h2 className="text-xl font-bold">Profil użytkownika</h2>
        <p><strong>Imię i nazwisko:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>
    );
  } 
  