import unittest
import api_machine as m


class TestUrlMachine(unittest.TestCase):
    """Tests class for UrlMachine"""

    def test_base_url(self):
        url = 'https://omi.zonarsystems.net/interface.php?'
        t = m.UrlMachine(url, {'action': 'showpos'})
        self.assertIs(type(t.base), str)  # dry maybe
        self.assertGreater(len(t.base), 1)

    def test_params(self):
        url = 'https://omi.zonarsystems.net/interface.php?'
        t = m.UrlMachine(url, {'action': 'showpos'})
        self.assertIs(type(t.params), dict)
        self.assertGreater(len(t.params), 0)

    def test_make_url(self):
        url = 'https://omi.zonarsystems.net/interface.php?'
        t = m.UrlMachine(url, {'action': 'showpos'})
        self.assertGreater(len(t.make_url()), len(t.base))
        self.assertIsInstance(t.make_url(), str)

    def test_make_call(self):
        url = 'https://omi.zonarsystems.net/interface.php?'
        t = m.UrlMachine(url, {'action': 'showpos'})
        t.make_url()
        self.assertNotIsInstance(t.make_call(), str)
        self.assertIsInstance(t.make_call(), bytes)


# class TestDataConverterTool(unittest.TestCase):
#     """Test class for DataConverterTool"""
#
#     def test_byte_to_xml(self):
#         pass
#
#     def test_xml_to_dictionary_zpeekv3(self):
#         pass


if __name__ == '__main__':
    unittest.main()
