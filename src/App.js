import Footer from "./features/footer/Footer";
import Header from "./features/headers/Header";
import TodosList from "./features/todos/TodosList";

function App() {
  return (
    <div>
      <nav className="bg-teal-700 py-4 flex items-center justify-center">
        <div className="text-white ">Todos App</div>
      </nav>
      <main>
        <div className="bg-white w-3/4 mx-auto my-12">
          <div className="w-full">
            <Header />
            <TodosList />
            <Footer />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
