import React, { useReducer } from 'react';
import { FileUp, BookOpen } from 'lucide-react';
import PDFViewer from './components/PDFViewer';
import Sidebar from './components/SideBar';

interface State {
  file: File | null;
  isReading: boolean;
  savedWords: string[];
}

interface Action {
  type: 'SET_FILE' | 'TOGGLE_READING' | 'SAVE_WORD' | 'REMOVE_WORD';
  payload?: any;
}

const initialState: State = {
  file: null,
  isReading: false,
  savedWords: []
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_FILE':
      return { ...state, file: action.payload };
    case 'TOGGLE_READING':
      return { ...state, isReading: !state.isReading };
    case 'SAVE_WORD':
      return state.savedWords.includes(action.payload)
        ? state
        : { ...state, savedWords: [...state.savedWords, action.payload] };
    case 'REMOVE_WORD':
      return {
        ...state,
        savedWords: state.savedWords.filter(word => word !== action.payload)
      };
    default:
      return state;
  }
}

const App: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      dispatch({ type: 'SET_FILE', payload: e.target.files[0] });
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col">
      <header className="bg-slate-800 p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <BookOpen className="text-teal-500" size={28} />
            <h1 className="text-2xl font-bold text-teal-500">PDF Buddy</h1>
          </div>
          {state.isReading && (
            <button
              onClick={() => dispatch({ type: 'TOGGLE_READING' })}
              className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-md"
            >
              Back to Home
            </button>
          )}
        </div>
      </header>
      <main className="flex-grow flex">
        {state.isReading ? (
          <div className="flex flex-1 h-[calc(100vh-64px)]">
            <div className="flex-grow">
              <PDFViewer />
            </div>
            <Sidebar words={state.savedWords} onRemoveWord={(word) => dispatch({ type: 'REMOVE_WORD', payload: word })} />
          </div>
        ) : (
          <div className="container mx-auto flex items-center justify-center flex-col py-20">
            <div className="bg-slate-800 p-8 rounded-lg shadow-xl max-w-md w-full text-center">
              <BookOpen className="mx-auto text-teal-500 mb-4" size={64} />
              <h2 className="text-2xl font-bold mb-4">Welcome to PDF Buddy</h2>
              <p className="text-gray-300 mb-6">Upload a PDF file to get started. You can read the document and save important words for reference.</p>
              <div className="relative flex items-center justify-center">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="flex absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <button className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-md flex items-center mx-auto">
                  <FileUp className="mr-2" size={18} />
                  {state.file ? state.file.name : "Upload PDF"}
                </button>
              </div>
              {state.file && (
                <button
                  onClick={() => dispatch({ type: 'TOGGLE_READING' })}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md flex items-center mx-auto mt-4"
                >
                  <BookOpen className="mr-2" size={18} />
                  Read PDF
                </button>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
