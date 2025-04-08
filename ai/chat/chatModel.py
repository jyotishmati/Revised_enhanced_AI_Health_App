from langchain import HuggingFaceHub
from langchain.chains import LLMChain
from langchain.prompts import PromptTemplate

HUGGINGFACEHUB_API_TOKEN = "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"
from dotenv import load_dotenv

load_dotenv()

llm = HuggingFaceHub(
    repo_id="mistralai/Mistral-7B-Instruct-v0.1",
    huggingfacehub_api_token=HUGGINGFACEHUB_API_TOKEN,
    model_kwargs={"temperature": 0.5, "max_new_tokens": 256}
)

template = PromptTemplate.from_template("Question: {question}\nAnswer:")
chain = LLMChain(llm=llm, prompt=template)



def ModelResponse(text):
    answer = chain.run(text)
    answer = answer.replace("Question:", "").replace("Answer:", "").replace(text, "").strip()
    return answer  
