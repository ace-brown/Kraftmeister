import sys, os

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from langchain.chat_models import init_chat_model
from langchain_core.output_parsers import (
    JsonOutputParser,
    StrOutputParser,
    PydanticOutputParser,
)
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.messages import HumanMessage, SystemMessage
import config  # ensures load_dotenv() runs before init_chat_model reads env vars
from pydantic import BaseModel, Field

# llm = init_chat_model("claude-sonnet-4-6", model_provider="anthropic")
llm = init_chat_model("gpt-4o-mini")


class Person(BaseModel):
    name: str = Field(description="The person's name")
    age: int = Field(description="The person's age")
    occupation: str = Field(description="Person's occupation")


def test():

    # parser = PydanticOutputParser(pydantic_object=Person)

    # prompt = ChatPromptTemplate.from_template(
    # "Return a JSON Object with name, age, occupation {desc}"
    # )

    # chain = prompt | llm | parser

    structured_model = llm.with_structured_output(Person)

    response = structured_model.invoke(
        "Once opon a time there was a 20 years old man, Alibab, who got became warrior"
    )

    print(response)


if __name__ == "__main__":
    test()
