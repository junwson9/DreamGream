class PromptTemplate:
    def __init__(self, input_variables=None, template=None):
        self.input_variables = input_variables or []
        self.template = template or ""

    def format(self, **kwargs):
        """
        템플릿 문자열에 주어진 변수들을 대입하여 완성된 프롬프트를 생성합니다.

        Args:
            **kwargs: 템플릿 문자열에 사용될 변수들의 값을 키워드 인자로 전달합니다.

        Returns:
            str: 완성된 프롬프트 문자열을 반환합니다.
        """
        formatted_template = self.template.format(**kwargs)
        return formatted_template
